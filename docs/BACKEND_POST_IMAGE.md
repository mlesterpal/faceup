# Backend: optional post image (ASP.NET)

Apply these changes in your API project at `http://localhost:5182`.

## 1. Database migration

```sql
ALTER TABLE Posts ADD ImageUrl NVARCHAR(500) NULL;
```

## 2. Entity

```csharp
public class Post
{
    public int PostId { get; set; }
    public string Message { get; set; } = "";
    public string? ImageUrl { get; set; }
    public int UserId { get; set; }
    // ...
}
```

## 3. Create request DTO

```csharp
public class CreatePostRequest
{
    public string? Message { get; set; }
    public IFormFile? Image { get; set; }
}
```

## 4. POST /api/post (multipart)

```csharp
[HttpPost]
[Consumes("multipart/form-data")]
public async Task<IActionResult> CreatePost([FromForm] CreatePostRequest request)
{
    var hasMessage = !string.IsNullOrWhiteSpace(request.Message);
    var hasImage = request.Image is { Length: > 0 };

    if (!hasMessage && !hasImage)
        return BadRequest("Add text or an image to post.");

    string? imageUrl = null;
    if (hasImage)
    {
        var ext = Path.GetExtension(request.Image!.FileName);
        var fileName = $"{Guid.NewGuid()}{ext}";
        var dir = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "posts");
        Directory.CreateDirectory(dir);
        var path = Path.Combine(dir, fileName);
        await using (var stream = System.IO.File.Create(path))
            await request.Image.CopyToAsync(stream);
        imageUrl = $"/uploads/posts/{fileName}";
    }

    var post = new Post
    {
        Message = request.Message?.Trim() ?? "",
        ImageUrl = imageUrl,
        UserId = 1, // use authenticated user
    };
    // save post...
    return Ok();
}
```

## 5. GET response DTO

Include nullable `imageUrl` in list items returned to the frontend.

## 6. Program.cs

```csharp
app.UseStaticFiles();
```

Ensure `wwwroot/uploads/posts` is served so `/uploads/posts/{file}` is reachable.
