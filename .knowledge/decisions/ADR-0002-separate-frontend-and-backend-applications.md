---
id: ADR-0002
name: Separate frontend and backend applications
status: accepted
createdAt: 2026-08-31T10:58:29+03:00
updatedAt: 2026-08-31T10:58:29+03:00
---

## Context

Vehicle Cost Ledger için kullanıcı arayüzü ile API farklı sorumluluklara sahiptir. Frontend, Next.js'in rendering ve routing yeteneklerine; backend ise NestJS'in HTTP, authentication, validation ve dependency injection yapısına ihtiyaç duyar.

## Decision

Kullanıcı arayüzü `apps/frontend` altında Next.js uygulaması, API ise `apps/backend` altında NestJS uygulaması olarak geliştirilecektir. Uygulamalar aynı monorepo içinde bulunacak ancak ayrı çalışma zamanları ve build çıktıları üretecektir.

## Consequences

Her uygulama kendi framework kurallarını ve bağımlılıklarını bağımsız olarak yönetebilir. API, frontend dışında başka istemciler tarafından da tüketilebilir. Buna karşılık uygulamalar arasında HTTP contract, authentication cookie politikası ve deployment yapılandırması açıkça yönetilmelidir; tek bir full-stack runtime'ın sağlayacağı doğrudan çağrı imkanı yoktur.
