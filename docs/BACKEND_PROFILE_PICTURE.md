# Backend: user profile picture (ASP.NET)

Apply in your API project at `http://localhost:5182`.

## Endpoint (expected by React)

```
POST /api/user/{userId}/profile-picture
Content-Type: multipart/form-data
Form field: image (IFormFile)
```

## Response

```json
{
  "profilePicture": "/uploads/profiles/user-1.jpg"
}
```

## GET user (optional, for initial avatar)

```
GET /api/user/{userId}
```

Include `profilePicture` on the user DTO (nullable string).

## Database

```sql
ALTER TABLE Users ADD ProfilePicture NVARCHAR(500) NULL;
```
