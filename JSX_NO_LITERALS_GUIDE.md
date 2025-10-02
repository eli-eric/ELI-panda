# JSX No-Literals ESLint Warning - Průvodce opravami

## 📊 Aktuální stav projektu

- **Původní počet varování:** 273
- **Aktuální počet varování:** 204
- **Opraveno:** 69 varování (25% redukce)
- **Cíl:** Systematicky snižovat počet varování na minimum

## 🎯 Co je jsx-no-literals varování?

ESLint pravidlo `react/jsx-no-literals` zakazuje hardcoded stringy v JSX komponentách. Všechny texty musí být přeloženy pomocí i18n systému (react-intl).

```typescript
// ❌ ŠPATNĚ - hardcoded string
<button>Save Changes</button>

// ✅ SPRÁVNĚ - přeložený text
<button>{fm({ id: message.common.buttons.save })}</button>
```

## 📁 Struktura i18n systému

### Hlavní soubory

- **Překlady:** `/src/i18n/src/locale/en.ts`
- **Message paths:** `/src/i18n/src/messages.ts` (automaticky generováno)
- **Import v komponentě:** `import { message } from '@/i18n/src/messages'`

### Organizace překladů v en.ts

```typescript
{
  common: {
    buttons: { /* globální tlačítka */ },
    ui: { /* UI elementy */ },
    form: { /* formulářové prvky */ },
    imageGallery: { /* galerie obrázků */ },
    fileManager: { /* správce souborů */ }
  },

  systemsPage: { /* specifické pro systems modul */ },
  publicationsPage: { /* specifické pro publications */ },
  ordersPage: { /* specifické pro orders */ },
  cataloguePage: { /* specifické pro catalogue */ },
  // ... další moduly
}
```

## 🔧 Standardní postup pro opravu souboru

### Krok 1: Najít soubory s varováními

```bash
# Zjistit celkový počet varování
yarn build 2>&1 | grep -c "jsx-no-literals"

# Vypsat prvních 20 souborů s varováními
yarn build 2>&1 | grep -B 1 "jsx-no-literals" | grep "^\\./" | head -20

# Najít konkrétní soubory podle vzoru
yarn build 2>&1 | grep -B 1 "jsx-no-literals" | grep "modules/orders"
```

### Krok 2: Analyzovat soubor

```bash
# Přečíst soubor
cat src/path/to/file.tsx

# Najít konkrétní varování
yarn build 2>&1 | grep "file.tsx" -A 2
```

**Příklad output:**

```
./src/components/ui/button.tsx
88:10  Warning: Strings not allowed in JSX files: "Delete Order"  react/jsx-no-literals
```

### Krok 3: Přidat překlad do en.ts (pokud neexistuje)

**Pravidla pro umístění:**

| Typ textu         | Umístění v en.ts        | Příklad                                  |
| ----------------- | ----------------------- | ---------------------------------------- |
| Globální tlačítka | `common.buttons.*`      | `save`, `cancel`, `delete`               |
| UI elementy       | `common.ui.*`           | `filter`, `search`, `pending`            |
| Formuláře         | `common.form.*`         | `required`, `optional`, `unsavedChanges` |
| Galerie           | `common.imageGallery.*` | `upload`, `delete`                       |
| Moduly            | `<module>Page.*`        | `systemsPage.title`                      |

**Příklad přidání překladu:**

```typescript
// /src/i18n/src/locale/en.ts
export const messages = {
  common: {
    ui: {
      // ... existující
      deleteOrder: 'Delete Order', // ← NOVÝ překlad
      confirmDelete: 'Are you sure?'
    }
  }
}
```

### Krok 4: Upravit komponentu

#### A) Přidat importy (nahoře souboru)

```typescript
import { useIntl } from 'react-intl'
import { message } from '@/i18n/src/messages'
```

#### B) Přidat hook do komponenty

```typescript
export const MyComponent = () => {
  const { formatMessage: fm } = useIntl()
  // nebo plný název:
  // const { formatMessage } = useIntl()

  // ... zbytek komponenty
}
```

#### C) Nahradit hardcoded string

```typescript
// PŘED:
<Button>Delete Order</Button>

// PO:
<Button>{fm({ id: message.common.ui.deleteOrder })}</Button>
```

### Krok 5: Ověřit změny

```bash
# Zkontrolovat počet varování
yarn build 2>&1 | grep -c "jsx-no-literals"

# Měl by se snížit o počet opravených stringů
```

## 🎨 Speciální případy a patterns

### 1. Aria-labels a accessibility atributy

```typescript
// PŘED:
<button aria-label="Close panel">
  <X className="icon" />
</button>

// PO:
<button aria-label={fm({ id: message.common.ui.closePanel })}>
  <X className="icon" />
</button>
```

### 2. Screen reader only (sr-only)

```typescript
// PŘED:
<label htmlFor="currency" className="sr-only">
  Currency
</label>

// PO:
<label htmlFor="currency" className="sr-only">
  {fm({ id: message.common.ui.currency })}
</label>
```

### 3. Template strings s proměnnými

```typescript
const { formatMessage: fm } = useIntl()

// PŘED:
<p>{`Filter ${columnName}`}</p>

// PO:
<p>{`${fm({ id: message.common.ui.filter })} ${columnName}`}</p>
```

### 4. Podmíněné stringy

```typescript
const { formatMessage: fm } = useIntl()

// PŘED:
<Badge>{isDelivered ? 'Delivered' : 'Pending'}</Badge>

// PO:
<Badge>
  {isDelivered
    ? fm({ id: message.common.ui.delivered })
    : fm({ id: message.common.ui.pending })
  }
</Badge>
```

### 5. Stringy v objektech (např. column headers)

```typescript
const { formatMessage: fm } = useIntl()

// PŘED:
const columns = [
  { id: 'title', header: 'Title' },
  { id: 'code', header: 'Code' }
]

// PO:
const columns = [
  { id: 'title', header: fm({ id: message.publicationsPage.columns.title }) },
  { id: 'code', header: fm({ id: message.publicationsPage.columns.code }) }
]
```

**Poznámka:** Hook `useIntl()` musí být použit v React komponentě nebo custom hooku.

### 6. Potvrzovací modaly s dynamickými hodnotami

```typescript
const { formatMessage: fm } = useIntl()

// Pro text s placeholdery použij formatMessage přímo:
const deleteMessage = fm(
  { id: message.ordersPage.deleteModal.message },
  { name: orderName } // dynamické hodnoty
)
```

## 📋 Kompletní příklady před/po

### Příklad 1: Jednoduchá komponenta

**PŘED:**

```typescript
export const MyButton = () => {
  return (
    <button className="btn">
      Save Changes
    </button>
  )
}
```

**PO:**

```typescript
import { useIntl } from 'react-intl'
import { message } from '@/i18n/src/messages'

export const MyButton = () => {
  const { formatMessage: fm } = useIntl()

  return (
    <button className="btn">
      {fm({ id: message.common.buttons.save })}
    </button>
  )
}
```

### Příklad 2: Komponenta s více stringy

**PŘED:**

```typescript
export const FilterFooter = ({ onClear }) => {
  return (
    <div>
      <h3>Filter Options</h3>
      <button onClick={onClear}>Clear filters</button>
      <button type="submit">Apply</button>
    </div>
  )
}
```

**PO:**

```typescript
import { useIntl } from 'react-intl'
import { message } from '@/i18n/src/messages'

export const FilterFooter = ({ onClear }) => {
  const { formatMessage: fm } = useIntl()

  return (
    <div>
      <h3>{fm({ id: message.common.ui.filterOptions })}</h3>
      <button onClick={onClear}>
        {fm({ id: message.common.ui.clearFilters })}
      </button>
      <button type="submit">
        {fm({ id: message.common.ui.apply })}
      </button>
    </div>
  )
}
```

### Příklad 3: Badge s podmínkou

**PŘED:**

```typescript
export const StatusBadge = ({ isActive }) => {
  return (
    <Badge>
      {isActive ? 'Active' : 'Inactive'}
    </Badge>
  )
}
```

**PO:**

```typescript
import { useIntl } from 'react-intl'
import { message } from '@/i18n/src/messages'

export const StatusBadge = ({ isActive }) => {
  const { formatMessage: fm } = useIntl()

  return (
    <Badge>
      {isActive
        ? fm({ id: message.common.ui.active })
        : fm({ id: message.common.ui.inactive })
      }
    </Badge>
  )
}
```

## 📝 Priority souborů k opravě

### ⚡ Vysoká priorita (nejvíce používané komponenty)

1. **Table komponenty** - používané napříč aplikací
   - `src/components/ui/table/table-pagination.tsx`
   - `src/components/ui/table/table-body.tsx`
   - `src/components/ui/table/table-header.tsx`

2. **Layout komponenty**
   - `src/components/ui/sidebar.tsx`
   - `src/components/ui/sheet.tsx`
   - `src/components/ui/carousel.tsx`

3. **Form komponenty**
   - `src/components/form/inputs/` - různé input komponenty
   - `src/components/ui/form/` - form UI elementy

### 🔶 Střední priorita

4. **Feature moduly - Orders**
   - `src/modules/orders/` - všechny komponenty
   - `src/modules/orderItem/` - order item komponenty

5. **Feature moduly - Catalogue**
   - `src/modules/catalogue/components/categoryEdit/`
   - `src/modules/catalogueItem/`

6. **Administration**
   - `src/modules/administration/user/`
   - `src/modules/administration/changePassword/`

### 🔷 Nízká priorita (časově náročné nebo málo používané)

7. **Velké soubory s mnoha stringy**
   - `src/modules/publications/publications.columns.tsx` (34 headers)
   - Tyto soubory mají mnoho column definic

8. **Privacy a Auth**
   - `src/app/(public)/panda-native/privacy/`
   - `src/modules/auth/`

## 🔍 Často používané překlady (již existují v en.ts)

### Buttons

```typescript
message.common.buttons.save // "Save"
message.common.buttons.cancel // "Cancel"
message.common.buttons.delete // "Delete"
message.common.buttons.exit // "Exit"
message.common.buttons.back // "Back"
message.common.buttons.saveAndExit // "Save and Exit"
message.common.buttons.continue // "Continue"
message.common.buttons.ok // "OK"
message.common.buttons.addNew // "Add new item"
message.common.buttons.return // "Return"
message.common.buttons.logOut // "Log out"
```

### UI Elements

```typescript
message.common.ui.clearFilters // "Clear filters"
message.common.ui.clearSelection // "Clear selection"
message.common.ui.search // "Search"
message.common.ui.filter // "Filter"
message.common.ui.clear // "Clear"
message.common.ui.apply // "Apply"
message.common.ui.currency // "Currency"
message.common.ui.category // "Category"
message.common.ui.delivered // "Delivered"
message.common.ui.pending // "Pending"
message.common.ui.deleteOrder // "Delete Order"
message.common.ui.modified // "Modified"
message.common.ui.total // "Total:"
message.common.ui.active // "Active:"
message.common.ui.inactive // "Inactive:"
message.common.ui.clickToAdd // "Click to add"
message.common.ui.noItemsFound // "No items found."
```

### Forms

```typescript
message.common.form.notAvailable // "N/A"
message.common.form.unsavedChanges // "You have unsaved changes"
message.common.form.yes // "Yes"
message.common.form.no // "No"
message.common.form.optional // "Optional"
message.common.form.required // "Required"
```

### Image Gallery

```typescript
message.common.imageGallery.upload // "Upload"
message.common.imageGallery.uploadAnImage // "Upload an image"
message.common.imageGallery.delete // "Delete"
message.common.imageGallery.noImagesAvailable // "No images available"
message.common.imageGallery.pngJpgInfo // "PNG, JPG up to 10MB"
message.common.imageGallery.confirmDelete // "Are you sure you want to delete"
```

### Errors

```typescript
message.common.errors.somethingWentWrong // "Something went wrong!"
message.common.errors.noResults // "No results"
```

### Record Not Found

```typescript
message.common.recordNotFound.title // "404"
message.common.recordNotFound.heading // "Record Not Found"
message.common.recordNotFound.message // "Sorry, the record you are looking for does not exist."
```

### Page-specific

```typescript
// Systems
message.systemsPage.notFound.heading // "System Not Found"
message.systemsPage.notFound.message // "No system found with code"

// Publications
message.publicationsPage.actions.editPublication // "Edit Publication"
message.publicationsPage.actions.deletePublication // "Delete Publication"
message.publicationsPage.columns.title // "Title"
message.publicationsPage.columns.code // "Code"
// ... mnoho dalších column headers

// Services
message.servicesPage.title // "Manage Services"
message.servicesPage.addNewService // "Add New Service"
```

## 💡 Tipy pro efektivitu

### 1. Seskupuj podobné soubory

Opravuj všechny filter footers najednou, všechny table komponenty najednou, atd. Ušetříš čas díky podobným patterns.

### 2. Začni s jednoduchými soubory

Soubory s 1-3 stringy jsou rychlé na opravu a dávají okamžitý pokrok.

### 3. Používej grep pro rychlé hledání

```bash
# Najdi všechny výskyty konkrétního textu
grep -rn "Delete Order" src/

# Najdi soubory s konkrétním varováním
yarn build 2>&1 | grep "Delete Order"
```

### 4. Batch changes

Oprav několik souborů před spuštěním build checku - šetří čas.

### 5. Kontroluj context

Ujisti se, že rozumíš kontextu - některé stringy by mohly být konstanta nebo enum, ne překlad.

### 6. Dokumentuj nové sekce

Když přidáváš novou sekci do en.ts, přidej komentář vysvětlující účel:

```typescript
// Orders module - table actions and modals
ordersPage: {
  actions: {
    deleteOrder: 'Delete Order'
  }
}
```

## 🚀 Kompletní workflow příklad

### Scénář: Opravit table-pagination.tsx

```bash
# 1. Zjistit aktuální počet varování
yarn build 2>&1 | grep -c "jsx-no-literals"
# Output: 204

# 2. Najít soubor
yarn build 2>&1 | grep "table-pagination" -A 2
# Output ukazuje konkrétní varování

# 3. Přečíst soubor
cat src/components/ui/table/table-pagination.tsx
# Identifikovat stringy: "Rows per page", "Page", "of"

# 4. Zkontrolovat zda překlady existují v en.ts
grep -n "rowsPerPage" src/i18n/src/locale/en.ts
# Pokud neexistují, přidat je

# 5. Upravit en.ts (pokud potřeba)
# Přidat do common.ui:
#   rowsPerPage: 'Rows per page',
#   page: 'Page',
#   of: 'of'

# 6. Upravit komponentu
# - Přidat import useIntl a message
# - Přidat const { formatMessage: fm } = useIntl()
# - Nahradit stringy za fm({ id: message.common.ui.rowsPerPage })

# 7. Ověřit
yarn build 2>&1 | grep -c "jsx-no-literals"
# Output: 201 (sníženo o 3)

# 8. Commitnout změny
git add .
git commit -m "fix: replace hardcoded strings with i18n in table-pagination"
```

## 🎯 Očekávané výsledky po dokončení priorit

| Priorita            | Odhadovaný pokles varování | Zbývající varování |
| ------------------- | -------------------------- | ------------------ |
| Po vysoké prioritě  | -40                        | ~164               |
| Po střední prioritě | -60                        | ~104               |
| Po nízké prioritě   | -80                        | ~24                |

**Cílový stav:** < 50 varování (většinou v málo používaných nebo legacy částech)

## 📚 Použité zdroje a nástroje

### ESLint pravidlo

```json
{
  "rules": {
    "react/jsx-no-literals": [
      "warn",
      {
        "noStrings": true,
        "ignoreProps": true
      }
    ]
  }
}
```

### React-intl dokumentace

- [React Intl API](https://formatjs.io/docs/react-intl/api/)
- [Message formatting](https://formatjs.io/docs/core-concepts/icu-syntax/)

### Užitečné příkazy

```bash
# Zjistit počet varování
yarn build 2>&1 | grep -c "jsx-no-literals"

# Vypsat soubory s varováními
yarn build 2>&1 | grep -B 1 "jsx-no-literals" | grep "^\\./"

# Najít konkrétní text v kódu
grep -rn "hardcoded text" src/

# Najít soubory bez useIntl
grep -L "useIntl" src/components/**/*.tsx

# Spočítat varování v konkrétním adresáři
yarn build 2>&1 | grep "jsx-no-literals" | grep "modules/orders" | wc -l
```

## 🤖 Prompt pro AI asistenty (Copilot/ChatGPT/Claude)

```
Úkol: Pokračovat v systematickém odstraňování jsx-no-literals ESLint varování v Next.js projektu.

Aktuální stav: 204 varování (sníženo z 273)

Postup:
1. Najdi soubory: yarn build 2>&1 | grep -B 1 "jsx-no-literals" | grep "^\\./" | head -10
2. Pro každý soubor:
   a) Přečti soubor a identifikuj hardcoded stringy
   b) Zkontroluj zda překlady existují v /src/i18n/src/locale/en.ts
   c) Pokud ne, přidej je do příslušné sekce (common.ui, common.buttons, apod.)
   d) Uprав komponentu:
      - Import: import { useIntl } from 'react-intl'
      - Import: import { message } from '@/i18n/src/messages'
      - Hook: const { formatMessage: fm } = useIntl()
      - Replace: <Button>Text</Button> → <Button>{fm({ id: message.path })}</Button>
3. Ověř: yarn build 2>&1 | grep -c "jsx-no-literals"

Priority:
- Vysoká: table komponenty, sidebar, sheet, carousel
- Střední: orders, catalogue, administration moduly
- Nízká: publications.columns.tsx (34 headers), privacy, auth

Pravidla:
- VŽDY nejdřív přečti soubor
- NEMĚŇ logiku, pouze stringy → překlady
- KONTROLUJ že překlad existuje
- Pro aria-label použij: aria-label={fm({ id: ... })}
- Pro sr-only: <label className="sr-only">{fm({ id: ... })}</label>

Často používané překlady již existují:
- message.common.buttons.save/cancel/delete/exit
- message.common.ui.filter/search/clear/clearFilters
- message.common.form.notAvailable (pro "N/A")
- message.common.imageGallery.upload/delete

Začni s jednoduchými soubory (1-3 stringy) pro rychlý pokrok.
```

---

## ✅ Dokončené soubory (reference)

<details>
<summary>Klikni pro zobrazení seznamu opravených souborů</summary>

### Navigation (5)

- `src/components/navigation/app-sidebar.tsx`
- `src/components/navigation/logout-button.tsx`
- `src/components/navigation/nav-main.tsx`
- `src/components/navigation/nav-projects.tsx`
- `src/components/navigation/nav-user.tsx`

### Common UI (4)

- `src/components/empty-section/EmptyResults.tsx`
- `src/components/error/ErrorPage.tsx`
- `src/components/pages/record-not-found.comp.tsx`
- `src/components/Notifications/Notification.tsx`

### Headers/Buttons (3)

- `src/components/header/HeaderWithButtons.tsx`
- `src/components/header/modal-header.buttons.tsx`
- `src/components/layout/PageHead.buttons.tsx`

### Overlays (3)

- `src/components/overlays/ModalProvider.tsx`
- `src/components/overlays/slideover/SlideOver.tsx`
- `src/components/sheet-form-buttons.tsx`

### Forms (5)

- `src/components/form/ImagePlaceHolder.tsx`
- `src/components/form/inline-edit/InlineEditCombobox.tsx`
- `src/components/form/inline-edit/InlineEditTextArea.tsx`
- `src/components/form/Combobox.tsx`
- `src/components/form/inputs/components/InputCurrency.comp.tsx`

### Shared Modules (2)

- `src/modules/shared/imageManager/ImageGallery.tsx`
- `src/modules/shared/system/device-info-overlay/components/sections/NotFound.tsx`

### Feature Modules (6)

- `src/modules/catalogue/components/filters/CatalogueFilterFooter.comp.tsx`
- `src/modules/orders/components/filters/OrdersFilterFooter.comp.tsx`
- `src/modules/systems/components/filters/SystemsFilterFooter.comp.tsx`
- `src/modules/publications/components/TitleCell.tsx`
- `src/modules/services/services.cont.tsx`
- `src/modules/orders/components/TableActions.tsx`

### UI Components (3)

- `src/components/ui/delivery-status-badge.tsx`
- `src/components/ui/table/filter-dropdown.tsx`
- ~~`src/components/ui/TableExample.tsx`~~ (smazáno - test file)

**Celkem opraveno: 31 souborů + 1 smazán**

</details>

---

## 📞 Kontakt a podpora

Pokud narazíš na problémy:

1. Zkontroluj že máš správně naimportovaný `useIntl` a `message`
2. Ověř že překlad existuje v en.ts
3. Spusť `yarn build` pro aktuální seznam varování
4. Zkontroluj že hook `useIntl()` je použit v React komponentě (ne v běžné funkci)

---

**Poslední aktualizace:** 2025-10-01
**Verze dokumentu:** 1.0
**Autor oprav:** Claude (Anthropic) + Jan Smrčka
