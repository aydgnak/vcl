---
created_at: 2026-06-14 17:10 +03:00
---

# Proje Genel Bakış

## Purpose
VCL (Vehicle Cost Ledger), araç maliyetlerinin takip edilmesini sağlayan bir monorepo projesidir.

## Scope
- Bun tabanlı monorepo mimarisi
- `apps/backend` — NestJS 11 backend uygulaması
- `packages/*` altında paylaşımlı paketler (henüz boş)

## Key Information
- **Proje Adı:** vcl
- **Açıklama:** Vehicle Cost Ledger
- **Package Manager:** bun@1.3.14
- **Workspaces:** `apps/*`, `packages/*`
- **Root Scripts:** `build`, `dev` (`bun run --filter "./apps/*" dev`)
- **apps/backend:** NestJS 11 (`@nestjs/core ^11.1.26`), Express platform, `PORT` env ile başlıyor (fallback `3000`)
- **apps/packages:** henüz boş
- **Lint:** root ve workspace seviyesinde ESLint (`@antfu/eslint-config`)
- **Config dosyaları:** `opencode.json`, `renovate.json`, `eslint.config.mjs`
- **Test:** `apps/backend` içinde Jest (`ts-jest`)

## Related Pages
- [[knowledge-base-structure]]
- [[system-check-2026-06-14]]
