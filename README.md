# flash file drop

File upload & download application, providing a quick link for sharing and keeping it within 7 days.

Stack used in this project: Node.JS, Fastify, Prisma, Cloudflare R2.

### Requirements

#### Functional Requirements (RFs):

- [ ] It must be possible to perform new uploads;
- [ ] It must be possible to view the last 5 uploads made;

#### Business Rules (RNs):

- [ ] Uploads should be automatically removed after 7 days;
- [ ] It should only be possible to view unexpired uploads;
- [ ] It should only be possible to upload secure files;
- [ ] It should only be possible to upload files up to 1GB each;

#### Non-Functional Requirements (RNFs):

- [ ] Using Cloudflare R2 to upload files;
- [ ] Uploading must be done directly by the front-end using Presigned URLs (upload strategy);
- [ ] Sharing links must be signed, preventing public access;

### Important details

#### Prohibited Mime Types

Some files cannot be sent by the user such as: `.exe`, `.dll`, `.bat`, `.cmd`, `.sh`, `.cgi`, `.jar`, `.app`.

```ts
const BANNED_MIME_TYPES = [
  ".exe", // (executables),
  ".dll", // (dynamic libraries)
  ".bat", // (batch files)
  ".cmd", // (command files)
  ".sh", // (shell scripts)
  ".cgi", // (CGI scripts)
  ".jar", // (Java files)
  ".app", // (macOS apps)
]
```

#### Code snippets

##### Connecting to Cloudflare (AWS SDK)

```ts
import { S3Client } from "@aws-sdk/client-s3"

export const r2 = new S3Client({
  region: "auto",
  endpoint: env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: env.CLOUDFLARE_SECRET_KEY,
  },
})
```

##### Upload to Cloudflare

```ts
const signedUrl = await getSignedUrl(
  r2,
  new PutObjectCommand({
    Bucket: "bucket-name",
    Key: "file.mp4",
    ContentType: "video/mp4",
  }),
  { expiresIn: 600 }
)
```

```ts
await axios.put(uploadURL, file, {
  headers: {
    "Content-Type": file.type,
  },
})
```
