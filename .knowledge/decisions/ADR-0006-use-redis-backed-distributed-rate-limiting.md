---
id: ADR-0006
name: Use Redis-backed distributed rate limiting
status: accepted
createdAt: 2026-08-31T10:58:29+03:00
updatedAt: 2026-08-31T10:58:29+03:00
---

## Context

API, brute-force ve kötüye kullanım risklerine karşı rate limiting uygular. Birden fazla backend instance'ı çalıştığında in-memory sayaçlar instance'lar arasında tutarlı limit uygulayamaz.

## Decision

Global throttling için NestJS Throttler kullanılacak; sayaçlar Redis'te `@nest-lab/throttler-storage-redis` üzerinden tutulacaktır. Redis bağlantısı `REDIS_URL` ile zorunlu runtime configuration olarak doğrulanacaktır. Endpoint'ler gerektiğinde global limitten daha sıkı limit tanımlayabilir.

## Consequences

Rate limit'ler backend instance'ları arasında tutarlı uygulanır ve authentication endpoint'leri için ayrı limitler tanımlanabilir. Redis, rate limiting için zorunlu operasyonel bağımlılık haline gelir; erişilemediği durumlardaki davranış izlenmeli ve operasyonel olarak yönetilmelidir. Throttler storage bağlantısı, diğer Redis kullanımlarından bağımsız olarak yapılandırılır.
