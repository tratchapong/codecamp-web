# โครงสร้างโปรเจกต์

```text
app/                      # App Router (เฉพาะไฟล์ route-level และ composition)
  (public)/               # กลุ่มหน้า public (layout แยกได้)
    layout.tsx
    page.tsx              # Home
    assets/
      page.tsx            # Listing (compose จาก module: assets)
      [slug]/page.tsx     # Detail
    docs/
      page.tsx            # Docs landing
      [asset]/[version]/[...page]/page.tsx
    blog/
      page.tsx
      [slug]/page.tsx
    support/page.tsx
  api/og/route.ts         # OG image (ถ้าต้องการ)
  sitemap.ts              # sitemap

src/
  ├── features/                 # แยกแต่ละ domain ของระบบ
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.vue
│   │   ├── pages/
│   │   │   └── LoginPage.vue
│   │   ├── services/
│   │   │   └── auth.api.js
│   │   ├── store/
│   │   │   └── auth.store.js
│   │   ├── router.js
│   │   └── index.js
│   │
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductCard.vue
│   │   │   └── ProductList.vue
│   │   ├── pages/
│   │   │   ├── ProductsPage.vue
│   │   │   └── ProductDetailPage.vue
│   │   ├── services/
│   │   │   └── products.api.js
│   │   ├── store/
│   │   │   └── products.store.js
│   │   ├── router.js
│   │   └── index.js
│   │
│   └── cart/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── store/
│       ├── router.js
│       └── index.js
      ...

  shared/                 # ของกลางที่ reusable ข้ามฟีเจอร์
    ui/                   # UI primitives (button, card, table, alert, mdx components)
      Button.tsx
      Card.tsx
      Mdx.tsx
      Prose.tsx
      AudioPlayer.tsx
    libs/                 # utilities (server/client), adapters generic
      env.ts
      r2.ts               # signed URL helper
      markdown.ts
      mdx.ts
      types.ts
      format.ts
    server/               # server actions, email, analytics
      actions/
        contact.submit.ts
      email/
        transporter.ts
    hooks/
      useMediaQuery.ts
      useAudio.ts
    config/
      site.ts             # ชื่อแบรนด์, ลิงก์ร้านบน Unity, social, etc.
      nav.ts              # เมนู/ไซด์บาร์
    styles/
      globals.css
      prose.css
    test/
      test-utils.tsx

content/                  # แหล่งข้อมูล MDX จริง ๆ (version-controlled)
  assets/
    patch-bgm-bundle.mdx
  docs/
    patch-bgm-bundle/
      1.0/
        getting-started.mdx
        installation.mdx
      1.1/
        getting-started.mdx
        migration.mdx
  blog/
    2025-09-01-launch.mdx

contentlayer.config.ts    # schema mapping MDX -> typed models
tailwind.config.ts
tsconfig.json

```
