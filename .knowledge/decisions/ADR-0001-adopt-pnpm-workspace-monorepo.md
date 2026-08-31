---
id: ADR-0001
name: Adopt pnpm workspace monorepo
status: accepted
createdAt: 2026-08-31T10:58:29+03:00
updatedAt: 2026-08-31T10:58:29+03:00
---

## Context

Proje, birbirinden bağımsız deploy edilebilen frontend ve backend uygulamalarını, bu uygulamaların ortak kullandığı kodla birlikte yönetir. Uygulamalar arası değişikliklerin tek değişiklik setinde doğrulanması ve ortak paketlerin sürüm uyuşmazlığı olmadan tüketilmesi gerekir.

## Decision

Repository, pnpm workspace monorepo olarak `apps/*` ve `packages/*` dizinleriyle düzenlenecektir. Deploy edilebilir uygulamalar `apps/` altında, yeniden kullanılabilir kodlar `packages/` altında bulunacaktır. Ortak paket bağımlılıkları `workspace:*` ile tanımlanacak; CI önce paketleri, sonra uygulamaları build edecektir.

## Consequences

Frontend, backend ve ortak paket değişiklikleri atomik olarak geliştirilebilir ve birlikte lint, typecheck ve build edilebilir. Ortak paketlerin build çıktısı uygulamalar tarafından kullanılabilir olmalıdır; bu nedenle CI ve yerel build sırası paket bağımlılıklarını gözetmelidir. Repository kapsamı ve CI çalıştırma alanı, ayrı repository yaklaşımına göre daha geniştir.
