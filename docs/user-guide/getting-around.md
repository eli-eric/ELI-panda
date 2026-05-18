# Getting around the app

Layout, login, keyboard shortcuts, dark mode, and other generic chrome of ELI PANDA. Read this once before using any specific feature module.

## Audience

Everyone using PANDA. No specific role required to read this.

## Logging in and out

### Sign in

PANDA authenticates against **Microsoft Entra ID** (formerly Azure AD).

1. Open the app. The landing page shows the **ELI PANDA** logo and a single **Sign in** button.
2. Click *Sign in.* You are redirected to the Microsoft login page.
3. After successful Microsoft login you land on the dashboard. Your account is enriched on first login with name, email, facility, and roles from the internal user database.

`[SCREENSHOT PLACEHOLDER: PANDA landing screen with logo and a Sign in button]`

There is no separate "PANDA password" — credentials are managed by Microsoft Entra ID. **Forgotten passwords are reset via Microsoft**, not in PANDA.

### Sign out

1. Click your profile in the bottom of the left sidebar (avatar + name + email).
2. In the dropdown, click **Log Out** (bottom option).
3. The session ends and you are taken back to the sign-in screen.

`[SCREENSHOT PLACEHOLDER: user profile dropdown open at the bottom of the sidebar showing Profile, Dark Mode, Support, Log Out]`

## Layout

### The sidebar (left)

The sidebar is the main navigation surface. Top to bottom:

- **Logo** — *ELI PANDA*. Click to return to the dashboard.
- **Search bar** — opens the global search. Equivalent to pressing *Cmd / Ctrl + K* anywhere in the app.
- **Modules** — the feature modules visible to you (filtered by your roles): for example *Systems*, *Catalogue*, *Orders*, etc.
- **Administration** — facility-specific and admin modules (only shown if you have the right roles).
- **User profile** — your avatar, name, and email at the bottom; click for the user dropdown.

The sidebar can be collapsed to icon-only mode to free up screen space (see *Keyboard shortcuts* below). On mobile it becomes a sheet drawer hidden behind a menu button.

`[SCREENSHOT PLACEHOLDER: full sidebar expanded, showing logo, search, Modules section with several entries, Administration section, and user profile card at the bottom]`

### Page area

To the right of the sidebar is the main page area. There is **no global top bar** — every module owns its own header (e.g., the breadcrumb in System Hierarchy is a module-specific feature, not a global breadcrumb).

### Toasts

Loading / success / error feedback for actions appears as toast pop-ups in a corner (powered by Sonner). They auto-dismiss; the typical pattern is *Saving…* → *Saved successfully* (or *Failed to save*).

## Keyboard shortcuts

| Shortcut (Mac) | Shortcut (Win/Linux) | Action |
|---|---|---|
| **⌘ + K** | **Ctrl + K** | Open global search (command palette). |
| **⌘ + B** | **Ctrl + B** | Toggle the sidebar (full / icon-only on desktop, open / closed drawer on mobile). |
| **Esc** | **Esc** | Close the active modal, sheet, or dropdown. |

`[SCREENSHOT PLACEHOLDER: global search command palette open with a few result rows grouped by entity type]`

> 💡 **About the sidebar shortcut.** *Cmd / Ctrl + B* comes for free from the shadcn/ui sidebar component the app is built on — it is a standard shadcn convention, not a PANDA-specific feature. *Cmd / Ctrl + K* for the global search is wired explicitly in PANDA.

### Global search (⌘ / Ctrl + K)

- Press the shortcut anywhere in the app to open the command palette.
- Type **at least 2 characters** to search across systems, items, orders, and other entities. Results are grouped by entity type with a colored type badge.
- With fewer than 2 characters, the palette shows quick-navigation entries (recent / pinned views) instead of search results.
- *Enter* navigates to the selected result; *Esc* closes the palette.

## Light mode and dark mode

PANDA supports both color themes. Switching is per-user and persists across sessions.

1. Click your profile at the bottom of the sidebar.
2. In the dropdown, click **Dark Mode** (or **Light Mode** if you are already in dark).
3. The theme switches instantly and is remembered the next time you open the app.

`[SCREENSHOT PLACEHOLDER: user profile dropdown open with the Dark Mode / Light Mode toggle highlighted]`

The choice is stored in your browser; switching browsers or clearing site data resets it to the default (light).

## User profile and other dropdown items

The profile dropdown at the bottom of the sidebar contains:

- **Profile** — opens your user profile settings page.
- **Dark Mode / Light Mode** — theme toggle (see above).
- **Support** — link to support documentation.
- **Log Out** — ends the session.

## Sessions and timeouts

Sessions are managed by NextAuth with JWT tokens. There is no aggressive idle timeout — the session is durable across browser restarts as long as the underlying Microsoft tokens are valid. If a server-side action returns an authentication error, you'll be redirected back to the sign-in screen and can sign in again.

## Language

The app currently ships **English-only** translations. Hungarian is planned for ELI ALPS but not on the immediate roadmap. There is no in-app language switcher today.

## Tips & gotchas

- **The sidebar is your navigation.** PANDA does not use a global top-bar menu — if you can't find a module, expand the sidebar and look in *Modules* or *Administration*.
- **Use ⌘ / Ctrl + K liberally.** Faster than navigating to the relevant module and searching there. The palette can find systems, catalogue items, orders, and more in one place.
- **Toggle the sidebar on a small screen** with ⌘ / Ctrl + B — handy when reading wide tables.
- **Theme is per browser, not per account.** If you sign in on a different machine, you'll get the default theme until you flip it again.
- **No notifications center.** PANDA does not have a notifications bell. Transient feedback comes via toasts; persistent state is reflected in the data on the relevant module page.
- **No global page breadcrumb.** Some modules (notably System Hierarchy) have their own internal breadcrumbs for moving around their data structure — that is module-specific, not an app-wide feature.

## Related

- See the per-module pages in this guide for feature-specific workflows.
