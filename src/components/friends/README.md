# Friends dashboard — maintainer guide

Facebook-style Friends management UI at route **`/friends`**.

## Quick orientation

| Question | Answer |
|----------|--------|
| Route | `/friends` with nested child routes |
| Page shell | [`FriendsPage.tsx`](../../pages/FriendsPage.tsx) — Navbar + sidebar + `<Outlet />` |
| Top nav | Shared [`Navbar.tsx`](../Navbar.tsx) — Friends icon links to `/friends` |
| Mock data | [`friends.mock.ts`](friends.mock.ts) — 14 friend requests |
| Backend | None in v1 — Confirm/Delete are UI-only |

## Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Navbar                                                       │
├──────────────┬───────────────────────────────────────────────┤
│ Friends  ⚙  │  <Outlet /> — swaps by URL (no full reload)    │
│ ● Home       │  grid OR centered placeholder text            │
│ > Requests   │                                               │
│ > Suggestions│                                               │
└──────────────┴───────────────────────────────────────────────┘
```

- **Sidebar:** ~22% width, white; `NavLink` + `isActive` for highlight
- **Main:** `FriendsMainContent` wrapper; child route renders inside `Outlet`

## Mock routing (path → view)

| Path | Sidebar item | Main content |
|------|--------------|--------------|
| `/friends` | Home (active, `end` on NavLink) | [`FriendRequestsView`](FriendRequestsView.tsx) — card grid |
| `/friends/requests` | Friend requests | Same card grid |
| `/friends/suggestions` | Suggestions | Placeholder: People You May Know |
| `/friends/all` | All friends | Placeholder: List |
| `/friends/birthdays` | Birthdays | Placeholder: Calendar/Upcoming |
| `/friends/lists` | Custom lists | Placeholder: Custom Lists |

Configured in [`routes.tsx`](../../routes.tsx) as nested children of `/friends`.

## Component map

| File | Role |
|------|------|
| `friends.types.ts` | `FriendRequest`, `FriendsNavItem` types |
| `friends.mock.ts` | `MOCK_FRIEND_REQUESTS` |
| `FriendsSidebar.tsx` | Left nav + `NavLink` active state |
| `FriendsMainContent.tsx` | Shared main area shell |
| `FriendRequestCard.tsx` | Single request card |
| `FriendRequestsView.tsx` | Grid route element (Home + requests) |
| `FriendsViewPlaceholder.tsx` | Centered text for other views |
| `FriendRequestsSection.tsx` | Legacy; prefer `FriendRequestsView` |
| `FriendsPage.tsx` | Layout + `Outlet` |

## Change cookbook

| I want to… | Where to edit |
|------------|----------------|
| Add more mock cards | `friends.mock.ts` |
| Change grid columns | `FriendRequestsView.tsx` → `SimpleGrid columns` |
| Add a new sidebar view | 1) `FriendsSidebar.tsx` → `FRIENDS_NAV_ITEMS` 2) child route in `routes.tsx` 3) view component or placeholder |
| Replace placeholder with real UI | Swap `FriendsViewPlaceholder` for new component in `routes.tsx` |
| Wire Confirm / Delete | `FriendRequestCard` props + handler in `FriendRequestsView` |
| Change active nav styling | `FriendsSidebar.tsx` NavLink `isActive` branch |
| Mobile sidebar drawer | `FriendsPage.tsx` — not in v1 |

## How routing works

1. User clicks sidebar `NavLink` → URL changes (e.g. `/friends/suggestions`).
2. `FriendsPage` stays mounted; only `<Outlet />` child changes.
3. `isActive` on the matching nav row highlights blue.

## Design tokens

| Use | Value |
|-----|--------|
| Main background | `#f0f2f5` |
| Sidebar / cards | `white` |
| Primary action | `blue.600` |
| Muted text | `#6F7175` |
| Active nav | `blue.50` bg, `blue.600` text/icon |

## Note

[`LeftHome.tsx`](../LeftHome.tsx) is only for `/home`. This Friends sidebar is separate.
