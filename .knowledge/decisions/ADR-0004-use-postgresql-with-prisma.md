---
id: ADR-0004
name: Use PostgreSQL with Prisma
status: accepted
createdAt: 2026-08-31T10:58:29+03:00
updatedAt: 2026-08-31T10:58:29+03:00
---

## Context

Backend, ilişkisel kullanıcı verisini kalıcı olarak saklamalı; schema değişikliklerini izlenebilir migration'lar ile yönetmeli ve uygulama kodunda type-safe veri erişimi sağlamalıdır.

## Decision

Kalıcı veri için PostgreSQL kullanılacaktır. Backend, Prisma schema ve repository içindeki Prisma migration'ları üzerinden veri modelini yönetecek; çalışma zamanındaki bağlantı `@prisma/adapter-pg` ile kurulacaktır. Prisma client, backend kaynak ağacında CommonJS formatında üretilecektir.

## Consequences

Veri erişimi generated Prisma client ile type-safe hale gelir ve schema değişiklikleri migration geçmişinde izlenir. CI ve deployment süreçleri Prisma client üretimini içermelidir. PostgreSQL ve Prisma sürümleri backend'in temel çalışma zamanı bağımlılıklarıdır; veri erişiminde ORM sınırları gerektiğinde dikkate alınmalıdır.
