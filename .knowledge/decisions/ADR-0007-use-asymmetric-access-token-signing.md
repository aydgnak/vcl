---
id: ADR-0007
name: Use asymmetric access token signing
status: superseded
createdAt: 2026-09-04T05:54:20+03:00
updatedAt: 2026-09-27T02:20:18+03:00
supersededBy: ADR-0009
---

## Relations

- Superseded by [ADR-0009: Use symmetric JWT secrets with cookie-based refresh flow](./ADR-0009-use-symmetric-jwt-secrets-with-cookie-based-refresh-flow.md).

## Context

Frontend Proxy, yalnızca `accessToken` cookie varlığını kontrol ettiğinde sahte bir cookie korunan frontend rotalarına erişim sağlayabiliyordu. Proxy'nin her istekte backend'e session doğrulaması yapması, ek ağ ve veri erişimi maliyeti ile rate limit tüketimine neden olur.

## Decision

Access token'lar backend'de RSA private key ile `RS256` kullanılarak imzalanacaktır. Frontend Proxy, aynı token'ları yalnızca public key ile yerelde doğrulayacaktır. Proxy, `RS256` algoritmasını, imzayı, süre sonunu ve zorunlu `sub` ile `exp` claim'lerini doğrular. Refresh token'lar mevcut ayrı secret ile `HS256` olarak imzalanmaya devam eder. Backend JWT guard, access token doğrulamasından sonra kullanıcı varlığını kontrol etmeyi sürdürür.

## Consequences

Geçersiz, değiştirilmiş veya süresi dolmuş access token'lar backend isteği yapılmadan korunan frontend rotalarına erişemez. Private key yalnızca backend environment'ında tutulur; frontend environment'ında yalnızca public key bulunur. Backend'de silinen kullanıcılar access token süreleri bitene kadar statik frontend kabuğunu görebilir, ancak backend endpoint'leri kullanıcı varlığı kontrolü nedeniyle erişilemez kalır.
