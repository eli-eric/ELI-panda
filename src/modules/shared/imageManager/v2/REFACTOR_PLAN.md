# ImageGalleryV2 Refactor Plan

**Status**: 🚧 In Progress
**Created**: 2025-10-23
**Pattern**: Immediate Upload (FileManager-style)
**Scope**: Initial implementation for `catalogueItem` module only

---

## 🎯 Goals

1. **Eliminate duplicate uploads** - Server validates, no client-side ref issues
2. **Remove form coupling** - Gallery is independent, no refs/imperative API
3. **Immediate feedback** - Upload happens instantly, users see real-time progress
4. **Simplify architecture** - Follow Single Responsibility Principle
5. **Better UX** - Match modern patterns (Google Drive, Dropbox)

---

## 🔴 Problems Being Solved

### Current ImageGallery V1 Issues

| Problem                   | Root Cause                                         | Impact                                      |
| ------------------------- | -------------------------------------------------- | ------------------------------------------- |
| **Duplicate uploads**     | `useRef` state persists across tab switches        | Users upload same image 2x                  |
| **Cache inconsistency**   | Manual `queryClient.setQueryData()` + refs         | Preview disappears but upload still pending |
| **Tight form coupling**   | `forwardRef` + imperative `submit()`               | Complex, fragile dependencies               |
| **No immediate feedback** | Upload deferred until form submit                  | Users don't know if upload succeeded        |
| **Complex state**         | Refs + cache + form field `hasImageGalleryChanges` | Hard to debug, maintain                     |

---

## 🏗️ Architecture

### V1 (Current - Problems)

```
User uploads → useRef stores → Tab switch → Preview gone, ref still has file →
User uploads again → 2x in ref → Form submits → imageRef.current.submit() →
2x duplicates uploaded
```

### V2 (New - Solution)

```
User uploads → Upload immediately to server → Server returns image →
React Query cache updates → UI shows uploaded image →
No refs, no form coupling, server is source of truth
```

---

## 📂 File Structure

```
src/modules/shared/imageManager/
├── v2/                                    # NEW - ImageGalleryV2
│   ├── REFACTOR_PLAN.md                  # This file
│   ├── README.md                          # Usage docs + test coverage
│   ├── ImageGalleryV2.tsx                # Main component (presentational)
│   ├── types.ts                          # TypeScript types
│   ├── hooks/
│   │   ├── useImages.ts                  # Fetch images query
│   │   ├── useImageUpload.ts             # Upload mutation
│   │   └── useImageDelete.ts             # Delete mutation
│   ├── components/
│   │   ├── ImageCarousel.tsx             # Display with shadcn/ui Carousel
│   │   ├── ImageUploadZone.tsx           # Dropzone for uploads
│   │   └── ImageActions.tsx              # Action buttons (upload/delete)
│   └── __tests__/
│       ├── ImageGalleryV2.test.tsx
│       ├── useImages.test.ts
│       ├── useImageUpload.test.ts
│       └── useImageDelete.test.ts
│
├── ImageGallery.tsx                       # KEEP - V1 for backwards compat
├── types.ts                              # KEEP - Shared types
└── utils/                                # KEEP - V1 utilities
    ├── index.ts
    └── useImageGallery.ts
```

---

## 🔌 API Integration

### Server Endpoints (Existing - No changes needed)

**Upload Image**

```
POST /api/{itemType}/{itemId}/image
Body: { name: string, payload: string (base64) }
Response: { id: string, name: string, url: string, type: string }
```

**List Images**

```
GET /api/{itemType}/{itemId}/image
Response: Array<{ id, name, url, type, ts, size }>
```

**Delete Image**

```
DELETE /api/{itemType}/{itemId}/image/{imageId}
Response: {}
```

### Key API Features

- ✅ **Auto-generates UUID** for each image (`crypto.randomUUID()`)
- ✅ **Stores in MinIO** (S3-compatible)
- ✅ **Creates thumbnails** for images (100px width)
- ✅ **Returns sorted by timestamp** (newest first)
- ✅ **50MB max file size**

---

## 🧩 Component Architecture

### 1. **useImages Hook**

```typescript
// Fetch images with React Query
const useImages = ({ itemType, itemId }: UseImagesParams) => {
  return useQuery({
    queryKey: ['images', itemType, itemId],
    queryFn: () => fetcher(`/api/${itemType}/${itemId}/image`),
    enabled: !!itemId
  })
}
```

**Responsibilities**:

- Fetch images from server
- Cache with React Query
- Auto-refetch on mount
- Return `data`, `isLoading`, `error`

---

### 2. **useImageUpload Hook**

```typescript
// Upload with optimistic updates
const useImageUpload = ({ itemType, itemId }: UseImageUploadParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => {
      // Convert to base64, POST to server
    },
    onMutate: async file => {
      // Optimistic update: show preview immediately
      const tempImage = {
        id: `temp-${Date.now()}`,
        url: URL.createObjectURL(file),
        name: file.name
      }
      queryClient.setQueryData(['images', itemType, itemId], old => [
        tempImage,
        ...old
      ])
    },
    onSuccess: newImage => {
      // Replace temp with real image from server
      queryClient.setQueryData(['images', itemType, itemId], old =>
        old.map(img => (img.id.startsWith('temp') ? newImage : img))
      )
      toast.success(`Uploaded ${newImage.name}`)
    },
    onError: (error, file, context) => {
      // Rollback optimistic update
      queryClient.setQueryData(['images', itemType, itemId], context.previous)
      toast.error(`Failed to upload ${file.name}`)
    }
  })
}
```

**Responsibilities**:

- Convert File → base64
- Upload to server
- Optimistic updates (instant UI feedback)
- Auto-rollback on error
- Toast notifications

---

### 3. **useImageDelete Hook**

```typescript
// Delete with optimistic updates
const useImageDelete = ({ itemType, itemId }: UseImageDeleteParams) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (imageId: string) => {
      return axios.delete(`/api/${itemType}/${itemId}/image/${imageId}`)
    },
    onMutate: async imageId => {
      // Optimistic: remove from UI immediately
      queryClient.setQueryData(['images', itemType, itemId], old =>
        old.filter(img => img.id !== imageId)
      )
    },
    onSuccess: () => {
      toast.success('Image deleted')
    },
    onError: (error, imageId, context) => {
      // Rollback
      queryClient.setQueryData(['images', itemType, itemId], context.previous)
      toast.error('Failed to delete image')
    }
  })
}
```

**Responsibilities**:

- Delete from server
- Optimistic removal from UI
- Auto-rollback on error
- Toast notifications

---

### 4. **ImageGalleryV2 Component**

```typescript
interface ImageGalleryV2Props {
  itemType: FILE_TYPE
  itemId?: string
  hasEditRole?: boolean
  allowMultipleImages?: boolean
  className?: string
}

export const ImageGalleryV2 = ({
  itemType,
  itemId,
  hasEditRole,
  allowMultipleImages = true,
  className
}: ImageGalleryV2Props) => {
  // ✅ Pure props-based interface, no refs!
  const { data: images, isLoading } = useImages({ itemType, itemId })
  const { mutate: uploadImage, isPending: isUploading } = useImageUpload({ itemType, itemId })
  const { mutate: deleteImage } = useImageDelete({ itemType, itemId })

  // Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    disabled: !hasEditRole,
    onDrop: (files) => {
      files.forEach(file => uploadImage(file))
    }
  })

  return (
    <div className={className}>
      <ImageCarousel images={images} />
      <ImageUploadZone
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
      />
      <ImageActions
        onUpload={uploadImage}
        onDelete={deleteImage}
        hasEditRole={hasEditRole}
      />
    </div>
  )
}
```

**Key Principles**:

- ✅ **No refs** - Pure component
- ✅ **No imperative API** - No `forwardRef`, no `useImperativeHandle`
- ✅ **No form coupling** - Independent module
- ✅ **Immediate feedback** - Upload on drop
- ✅ **Declarative** - Just props in, UI out

---

## 🔄 Migration Strategy

### Phase 1: Build V2 (Week 1)

- [ ] Create `v2/` directory structure
- [ ] Implement core hooks (`useImages`, `useImageUpload`, `useImageDelete`)
- [ ] Build presentational components
- [ ] Write unit tests

### Phase 2: CatalogueItem Integration (Week 2)

- [ ] Replace ImageGallery with ImageGalleryV2 in `CatalogueItem.cont.tsx`
- [ ] Remove `imageRef` usage
- [ ] Remove `hasImageGalleryChanges` form field
- [ ] Remove submit coordination from `useItemSubmit`
- [ ] Test manually (upload, delete, duplicate scenarios)

### Phase 3: Documentation & Review (Week 2)

- [ ] Create `README.md` with usage examples
- [ ] Document test coverage
- [ ] Code review
- [ ] User acceptance testing

### Phase 4: Future Rollout (Week 3+)

- [ ] Keep V1 for other modules (systemItem, etc.)
- [ ] Gradual migration module by module
- [ ] Monitor for issues
- [ ] Eventually deprecate V1

---

## 📝 Integration Changes

### Before (V1 - Complex)

**CatalogueItem.cont.tsx**:

```typescript
const imageRef = useRef<ImageGalleryRef | undefined>(undefined)

const { submit } = useItemSubmit({
  setvalue: setValue,
  imageRef: imageRef, // ❌ Tight coupling
  saveAndExit,
  reset
})

// ...

<ImageGallery
  ref={imageRef} // ❌ Imperative API
  config={{ itemCategory: FILE_TYPE.CATALOGUE, itemId: uid }}
  hasEditRole={!disabledEdit}
  setValue={setValue} // ❌ Form coupling
/>
```

**useItemSubmit.tsx**:

```typescript
onSuccess: catalogueItem => {
  // ...
  imageRef?.current?.submit(catalogueItem.data?.uid, () => {
    // ❌ Imperative call
    if (saveAndExit) navigateBack()
  })
}
```

**ItemForm.schema.ts**:

```typescript
hasImageGalleryChanges: z.boolean().optional() // ❌ Special form field
```

---

### After (V2 - Simple)

**CatalogueItem.cont.tsx**:

```typescript
// ✅ No refs needed!

const { submit } = useItemSubmit({
  setvalue: setValue,
  // No imageRef!
  saveAndExit,
  reset
})

// ...

<ImageGalleryV2
  // ✅ Pure props interface
  itemType={FILE_TYPE.CATALOGUE}
  itemId={uid}
  hasEditRole={!disabledEdit}
/>
```

**useItemSubmit.tsx**:

```typescript
onSuccess: catalogueItem => {
  // ✅ No image coordination needed!
  // Images already uploaded independently
  if (saveAndExit) navigateBack()
  else if (!uid) replace(PATH.CATALOGUE_ITEM + '/' + catalogueItem.data?.uid)
  toast.success('Item saved')
}
```

**ItemForm.schema.ts**:

```typescript
// ✅ No hasImageGalleryChanges field needed!
```

---

## ✅ Success Criteria

### Functional Requirements

- [ ] User can upload images via drag & drop or click
- [ ] User sees uploaded images immediately
- [ ] User can delete images with confirmation
- [ ] User receives toast notifications for upload/delete
- [ ] Images persist after page refresh
- [ ] No duplicate uploads when switching tabs
- [ ] Works with or without existing `itemId` (new items)

### Non-Functional Requirements

- [ ] Upload completes within 3 seconds for typical images (<5MB)
- [ ] UI remains responsive during upload
- [ ] Optimistic updates provide instant feedback
- [ ] Error states are clear and actionable
- [ ] Component is accessible (ARIA labels, keyboard nav)
- [ ] Test coverage >80%

### Architecture Requirements

- [ ] No refs used in component
- [ ] No form coupling (no setValue, no ref.current.submit)
- [ ] Uses React Query for all server state
- [ ] Follows shadcn/ui design system
- [ ] Passes ESLint with no warnings
- [ ] TypeScript strict mode compliant

---

## 🧪 Testing Strategy

### Unit Tests

**useImages.test.ts**

- ✅ Fetches images successfully
- ✅ Handles empty response
- ✅ Handles error state
- ✅ Disabled when no itemId

**useImageUpload.test.ts**

- ✅ Uploads image successfully
- ✅ Shows optimistic update
- ✅ Rolls back on error
- ✅ Shows toast notifications
- ✅ Converts File to base64 correctly

**useImageDelete.test.ts**

- ✅ Deletes image successfully
- ✅ Shows optimistic removal
- ✅ Rolls back on error
- ✅ Shows toast notifications

**ImageGalleryV2.test.tsx**

- ✅ Renders images correctly
- ✅ Shows empty state when no images
- ✅ Handles upload via dropzone
- ✅ Handles delete with confirmation
- ✅ Disables actions when no edit role
- ✅ Shows loading state

### Integration Tests

**CatalogueItem Integration**

- ✅ Images upload independently of form
- ✅ Images persist after form submit
- ✅ Images available after page refresh
- ✅ No duplicate uploads on tab switch
- ✅ Form can be submitted without images
- ✅ Form dirty state independent of images

---

## 🚀 Rollout Plan

### Week 1: Development

- **Days 1-2**: Core hooks implementation + tests
- **Days 3-4**: Components implementation + tests
- **Day 5**: Integration testing

### Week 2: Integration

- **Days 1-2**: CatalogueItem integration
- **Days 3-4**: Manual testing, bug fixes
- **Day 5**: Documentation (README.md)

### Week 3+: Expansion

- Monitor production usage
- Gather feedback
- Plan migration for other modules (systemItem, etc.)

---

## 📊 Comparison Matrix

| Feature                  | V1 (Current)    | V2 (New)       | Improvement         |
| ------------------------ | --------------- | -------------- | ------------------- |
| **Upload timing**        | On form submit  | Immediate      | ⬆️ Better UX        |
| **Duplicate protection** | ❌ Broken       | ✅ Server-side | ⬆️ Fixed bug        |
| **Form coupling**        | ✅ Tight (refs) | ❌ None        | ⬆️ Cleaner arch     |
| **State management**     | useRef          | React Query    | ⬆️ Standard pattern |
| **User feedback**        | Delayed         | Instant        | ⬆️ Better UX        |
| **Complexity**           | High            | Low            | ⬆️ Maintainable     |
| **Test coverage**        | ~20%            | >80%           | ⬆️ Quality          |
| **LOC**                  | ~450            | ~300           | ⬆️ Simpler          |

---

## 🎓 Lessons Learned

### What Went Wrong in V1

1. **Over-engineering** - Tried to be "smart" with deferred uploads
2. **Wrong abstraction** - `useRef` for state that should be in server
3. **Tight coupling** - Mixed image management with form lifecycle
4. **No tests** - Hard to verify behavior, led to bugs

### Principles for V2

1. **Server is source of truth** - Upload immediately, query for state
2. **Single Responsibility** - Gallery manages images, form manages form data
3. **Simplicity** - Fewest moving parts, standard patterns
4. **Test first** - Write tests alongside implementation
5. **User-centric** - Immediate feedback matches user expectations

---

## 🔗 References

- [React Query Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [FileManager Implementation](../../fileManager/FileManager.tsx) - Reference for immediate upload pattern
- [shadcn/ui Carousel](https://ui.shadcn.com/docs/components/carousel)
- [react-dropzone Docs](https://react-dropzone.js.org/)

---

## 📞 Questions & Decisions

### Q: What about offline support?

**A**: Out of scope for V2. Images require server upload, no local-first strategy.

### Q: Should we support undo?

**A**: Not in V2. Delete is permanent (with confirmation modal).

### Q: File size limits?

**A**: Server enforces 50MB limit. Client should validate before upload in future iteration.

### Q: Image optimization?

**A**: Server auto-generates 100px thumbnails. Client sends original.

### Q: Multiple simultaneous uploads?

**A**: Supported. Each file triggers separate mutation, React Query batches.

---

**Last Updated**: 2025-10-23
**Next Review**: After Phase 1 completion
