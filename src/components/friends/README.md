# Friends dashboard — maintainer guide

Facebook-style Friends management UI at route **`/friends`**, wired to **`/api/friend`** on `http://localhost:5182`.

## Quick orientation

| Question | Answer |
|----------|--------|
| Route | `/friends` with nested child routes |
| Page shell | [`FriendsPage.tsx`](../../pages/FriendsPage.tsx) — Navbar + sidebar + `<Outlet />` |
| API layer | [`friendService.ts`](../../services/friendService.ts), [`useFriends.ts`](../../hooks/useFriends.ts) |
| Current user | [`CURRENT_USER_ID`](../../constants/currentUser.ts) |

## Mock routing (path → view)

| Path | Sidebar item | Main content |
|------|--------------|--------------|
| `/friends` | Home | Incoming requests preview (max 8) |
| `/friends/requests` | Friend requests | Full incoming grid |
| `/friends/outgoing` | Sent requests | Outgoing pending grid |
| `/friends/suggestions` | Suggestions | People You May Know |
| `/friends/all` | All friends | Friends list with Unfriend |
| `/friends/birthdays` | Birthdays | Placeholder |
| `/friends/lists` | Custom lists | Placeholder |

## Component map

| File | Role |
|------|------|
| `friends.types.ts` | UI types |
| `friendService.ts` / `useFriends.ts` | API + TanStack Query |
| `FriendshipActionButtons.tsx` | State-based actions |
| `FriendUserCard.tsx` | Card with actions |
| `FriendRequestCard.tsx` | Incoming-only card |
| `FriendRequestsView.tsx` | Incoming list |
| `OutgoingRequestsView.tsx` | Sent list |
| `FriendSuggestionsView.tsx` | Suggestions |
| `AllFriendsView.tsx` | Friends list |

## API reference

See [`docs/PostController.txt`](../../../docs/PostController.txt) (FriendController).
