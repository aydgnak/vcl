---
created_at: 2026-06-14 17:10 +03:00
---

# Proje Genel Bakış

## Purpose
VCL (Vehicle Cost Ledger), araç maliyetlerinin takip edilmesini sağlayan bir monorepo projesidir.

## Scope
- Bun tabanlı monorepo mimarisi
- `apps/*` altında uygulamalar
- `packages/*` altında paylaşımlı paketler

## Key Information
- **Proje Adı:** vcl
- **Açıklama:** Vehicle Cost Ledger
- **Package Manager:** bun@1.3.14
- **Workspaces:** `apps/*`, `packages/*`
- **Durum:** Erken aşama — `apps/` ve `packages/` henüz boş (yalnızca `.gitkeep`)
- **Lint:** root seviyesinde ESLint (`@antfu/eslint-config`)
- **Config dosyaları:** `opencode.json`, `renovate.json`, `eslint.config.mjs`

## Related Pages
- [[knowledge-base-structure]]
- [[agent-rules]]
- [[system-check-2026-06-14]]
