# ImageGalleryV2

Modern image gallery component with immediate upload pattern. Provides a clean, form-independent solution for managing images with immediate feedback and no duplicate upload issues.

---

## 🎯 Key Features

- ✅ **Immediate Upload** - Images upload instantly on drop, not deferred
- ✅ **Form Independent** - No refs, no imperative API, completely decoupled
- ✅ **No Duplicates** - Server is source of truth, prevents duplicate uploads
- ✅ **Optimistic Updates** - Instant UI feedback with automatic rollback on error
- ✅ **React Query Powered** - All state managed by React Query, no manual cache manipulation
- ✅ **Sonner Toast Notifications** - Clear feedback for upload/delete operations
- ✅ **shadcn/ui Components** - Modern, accessible UI with Carousel, Button, etc.
- ✅ **TypeScript First** - Fully typed with strict mode support

---

## 📦 Installation

No installation needed - already part of the codebase.

```tsx
import { ImageGalleryV2 } from '@/modules/shared/imageManager/v2'
```

---

## 🚀 Basic Usage

```tsx
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGalleryV2 } from '@/modules/shared/imageManager/v2'

function MyComponent({ itemId }: { itemId?: string }) {
    const hasEditRole = usePermission([ROLE.EDIT])

    return (
        <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId={itemId} hasEditRole={hasEditRole} />
    )
}
```

---

## 📚 API Reference

### Props

| Prop                  | Type                  | Required | Default | Description                                                    |
| --------------------- | --------------------- | -------- | ------- | -------------------------------------------------------------- |
| `itemType`            | `FILE_TYPE`           | ✅       | -       | Type of item (e.g., `FILE_TYPE.CATALOGUE`, `FILE_TYPE.SYSTEM`) |
| `itemId`              | `string \| undefined` | ✅       | -       | UUID of the item. If undefined, gallery is disabled            |
| `hasEditRole`         | `boolean`             | ❌       | `false` | Whether user can upload/delete images                          |
| `allowMultipleImages` | `boolean`             | ❌       | `true`  | Allow multiple images in gallery                               |
| `disabled`            | `boolean`             | ❌       | `false` | Disable all actions                                            |
| `className`           | `string`              | ❌       | -       | Additional CSS classes                                         |

### Example with All Props

```tsx
<ImageGalleryV2
    itemType={FILE_TYPE.CATALOGUE}
    itemId="123-456-789"
    hasEditRole={true}
    allowMultipleImages={true}
    disabled={false}
    className="mb-4"
/>
```

---

## 🏗️ Architecture

### Component Structure

```
ImageGalleryV2 (Main Component)
├── useImages (Query Hook)
│   └── Fetches images from server
├── useImageUpload (Mutation Hook)
│   └── Uploads images with optimistic updates
├── useImageDelete (Mutation Hook)
│   └── Deletes images with optimistic updates
└── Components
    ├── ImageCarousel - Display images
    ├── ImageUploadZone - Drag & drop zone
    └── ImageActions - Action buttons
```

### Data Flow

```
User uploads file
  ↓
useImageUpload hook
  ↓
Optimistic update (show preview immediately)
  ↓
POST /api/{itemType}/{itemId}/image
  ↓
Server saves to MinIO
  ↓
Server returns image data
  ↓
React Query cache updated
  ↓
UI shows uploaded image
```

---

## 🔌 Server API

### Upload Image

```
POST /api/{itemType}/{itemId}/image
Content-Type: application/json

{
  "name": "image.jpg",
  "payload": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}

Response (201):
{
  "id": "abc-123-def",
  "name": "image.jpg",
  "url": "/api/catalogue/123/image/abc-123-def",
  "type": "image/jpeg"
}
```

### List Images

```
GET /api/{itemType}/{itemId}/image

Response (200):
[
  {
    "id": "abc-123",
    "name": "image1.jpg",
    "url": "/api/catalogue/123/image/abc-123",
    "type": "image/jpeg",
    "ts": 1698765432000,
    "size": 102400
  }
]
```

### Delete Image

```
DELETE /api/{itemType}/{itemId}/image/{imageId}

Response (200): {}
```

---

## 🎨 UI States

### Empty State (No Images)

```
┌─────────────────────────────────────┐
│                                     │
│              📷                     │
│         Upload an image             │
│     PNG, JPG up to 50MB             │
│                                     │
└─────────────────────────────────────┘
```

### With Images

```
┌─────────────────────────────────────┐
│ [Upload] [Delete]            1/3    │
├─────────────────────────────────────┤
│                                     │
│          [<] Image [>]              │
│                                     │
├─────────────────────────────────────┤
│        [🖼️] [🖼️] [🖼️]               │
└─────────────────────────────────────┘
```

### Upload in Progress

```
┌─────────────────────────────────────┐
│ [Upload] [Delete]      Uploading... │
├─────────────────────────────────────┤
```

---

## 🧪 Testing

### Test Coverage

Current test coverage: **31 test scenarios (>80% coverage)**

### Running Tests

```bash
# Run all tests
yarn test

# Run tests for ImageGalleryV2
yarn test imageManager/v2

# Run tests in watch mode
yarn test --watch imageManager/v2
```

### What's Tested

**Hooks:**

- ✅ `useImages` - Fetching, loading, error states (7 tests)
- ✅ `useImageUpload` - Upload, optimistic updates, rollback (6 tests)
- ✅ `useImageDelete` - Delete, optimistic removal, rollback (7 tests)

**Components:**

- ✅ `ImageGalleryV2` - Rendering, interactions, permissions (11 tests)

**Test Mocks:**

- ✅ `@/core/axios/axiosInstance` - HTTP requests
- ✅ `sonner` - Toast notifications
- ✅ `@/utils/fetcher` - Data fetching
- ✅ `FileReader` - File reading API

---

## 🆚 Comparison with V1

| Feature                  | V1 (Old)          | V2 (New)       | Winner |
| ------------------------ | ----------------- | -------------- | ------ |
| **Upload timing**        | On form submit    | Immediate      | V2 ⭐  |
| **Form coupling**        | Tight (refs)      | None           | V2 ⭐  |
| **State management**     | `useRef` + manual | React Query    | V2 ⭐  |
| **Duplicate protection** | ❌ Broken         | ✅ Works       | V2 ⭐  |
| **User feedback**        | Delayed           | Instant        | V2 ⭐  |
| **Code complexity**      | High (~450 LOC)   | Low (~300 LOC) | V2 ⭐  |
| **Testability**          | Hard              | Easy           | V2 ⭐  |
| **Maintainability**      | ❌ Complex        | ✅ Simple      | V2 ⭐  |

---

## 🐛 Common Issues & Solutions

### Issue: Images not showing after upload

**Cause**: `itemId` is undefined or invalid

**Solution**: Ensure `itemId` is a valid UUID before rendering ImageGalleryV2

```tsx
// ❌ Bad
;<ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId={undefined} />

// ✅ Good
{
    itemId && <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId={itemId} />
}
```

### Issue: Can't upload images

**Cause**: Missing `hasEditRole` prop

**Solution**: Pass `hasEditRole` prop

```tsx
// ❌ Bad (defaults to false)
<ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId={itemId} />

// ✅ Good
<ImageGalleryV2
  itemType={FILE_TYPE.CATALOGUE}
  itemId={itemId}
  hasEditRole={!disabledEdit}
/>
```

### Issue: Upload fails with 413 error

**Cause**: Image size exceeds 50MB limit

**Solution**: Server enforces 50MB limit. Consider adding client-side validation:

```tsx
const validateFileSize = (file: File) => {
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
        toast.error('File size exceeds 50MB')
        return false
    }
    return true
}
```

---

## 🔄 Migration from V1

### Before (V1)

```tsx
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import type { ImageGalleryRef } from '@/modules/shared/imageManager/types'

const Component = () => {
    const imageRef = useRef<ImageGalleryRef>()
    const [hasChanges, setHasChanges] = useState(false)

    const handleSubmit = () => {
        imageRef.current?.submit(itemId, () => {
            // Success callback
        })
    }

    return (
        <ImageGallery
            ref={imageRef}
            config={{ itemCategory: FILE_TYPE.CATALOGUE, itemId }}
            hasEditRole={hasEditRole}
            setValue={setValue}
        />
    )
}
```

### After (V2)

```tsx
import { ImageGalleryV2 } from '@/modules/shared/imageManager/v2'

const Component = () => {
    // No refs needed!
    // No submit coordination needed!

    const handleSubmit = () => {
        // Images already uploaded independently
        // Just submit form data
    }

    return (
        <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId={itemId} hasEditRole={hasEditRole} />
    )
}
```

### Migration Checklist

- [ ] Replace `ImageGallery` import with `ImageGalleryV2`
- [ ] Remove `imageRef` usage
- [ ] Remove `setValue` prop
- [ ] Remove `config` prop, use `itemType` and `itemId` instead
- [ ] Remove `imageRef.current?.submit()` calls
- [ ] Remove `hasImageGalleryChanges` from form schema (if exists)
- [ ] Test upload, delete, and form submission

---

## 📝 Examples

### Example 1: CatalogueItem Integration

```tsx
// src/modules/catalogueItem/CatalogueItem.cont.tsx
import { ImageGalleryV2 } from '@/modules/shared/imageManager/v2'

const CatalogueItemContainer = ({ uid }: { uid?: string }) => {
    const hasEditRole = !usePermission([ROLE.CATALOGUE_EDIT])

    return (
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8">
            <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId={uid} hasEditRole={hasEditRole} />
            <div className="col-span-2">{/* Form fields */}</div>
        </div>
    )
}
```

### Example 2: Conditional Rendering

```tsx
const Component = ({ itemId }: { itemId?: string }) => {
    if (!itemId) {
        return <p>Create item first to upload images</p>
    }

    return <ImageGalleryV2 itemType={FILE_TYPE.CATALOGUE} itemId={itemId} hasEditRole={true} />
}
```

### Example 3: Custom Styling

```tsx
<ImageGalleryV2
    itemType={FILE_TYPE.CATALOGUE}
    itemId={itemId}
    hasEditRole={true}
    className="border-2 border-dashed rounded-lg shadow-sm"
/>
```

---

## 🚧 Future Enhancements

### Planned Features

- [ ] Client-side image validation (size, format)
- [ ] Image compression before upload
- [ ] Progress bars for upload
- [ ] Image preview modal (full-screen)
- [ ] Batch upload support
- [ ] Image reordering (drag & drop)
- [ ] Image metadata editing (alt text, captions)
- [ ] Copy image URL to clipboard

### Performance Optimizations

- [ ] Lazy loading for images
- [ ] Virtual scrolling for large galleries
- [ ] Image CDN integration
- [ ] WebP conversion
- [ ] Responsive image sizes

---

## 🤝 Contributing

### Adding New Features

1. Create feature branch from `dev`
2. Implement feature in `v2/` directory
3. Add tests with >80% coverage
4. Update this README
5. Create PR with description

### Code Style

- Follow project ESLint rules
- Use TypeScript strict mode
- Add JSDoc comments for public APIs
- Keep components small (<200 LOC)
- Prefer composition over inheritance

---

## 📞 Support

### Questions?

- Check [REFACTOR_PLAN.md](./REFACTOR_PLAN.md) for architecture details
- Review existing issues in GitHub
- Ask in team Slack channel

### Found a Bug?

1. Check if issue exists in GitHub Issues
2. Create new issue with:
    - Steps to reproduce
    - Expected vs actual behavior
    - Screenshots if applicable
    - Browser/environment info

---

## 📄 License

Internal project - not for public distribution.

---

**Last Updated**: 2025-10-23
**Version**: 2.0.0
**Maintainer**: Development Team
