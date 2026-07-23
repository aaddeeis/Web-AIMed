# AIMed Web

Frontend publik untuk AIMed CoE. Semua konten dinamis dibaca dari Payload CMS.

## Development

1. Salin `.env.example` menjadi `.env.local`.
2. Tetapkan `VITE_PAYLOAD_URL` ke base URL CMS (tanpa `/api`).
3. Jalankan `bun install` lalu `bun run dev`.

Untuk deployment, CMS harus memiliki `WEB_URL` yang berisi origin frontend. Lebih dari satu origin dapat dipisahkan dengan koma.
