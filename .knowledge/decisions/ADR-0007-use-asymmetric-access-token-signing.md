---
id: ADR-0007
name: Use asymmetric access token signing
status: accepted
createdAt: 2026-09-04T05:54:20+03:00
updatedAt: 2026-09-04T05:54:20+03:00
---

## Context

Frontend Proxy, yalnızca `accessToken` cookie varlığını kontrol ettiğinde sahte bir cookie korunan frontend rotalarına erişim sağlayabiliyordu. Proxy'nin her istekte backend'e session doğrulaması yapması, ek ağ ve veri erişimi maliyeti ile rate limit tüketimine neden olur.

## Decision

Access token'lar backend'de RSA private key ile `RS256` kullanılarak imzalanacaktır. Frontend Proxy, aynı token'ları yalnızca public key ile yerelde doğrulayacaktır. Proxy, `RS256` algoritmasını, imzayı, süre sonunu ve zorunlu `sub` ile `exp` claim'lerini doğrular. Refresh token'lar mevcut ayrı secret ile `HS256` olarak imzalanmaya devam eder. Backend JWT guard, access token doğrulamasından sonra kullanıcı varlığını kontrol etmeyi sürdürür.

## Consequences

Geçersiz, değiştirilmiş veya süresi dolmuş access token'lar backend isteği yapılmadan korunan frontend rotalarına erişemez. Private key yalnızca backend environment'ında tutulur; frontend environment'ında yalnızca public key bulunur. Backend'de silinen kullanıcılar access token süreleri bitene kadar statik frontend kabuğunu görebilir, ancak backend endpoint'leri kullanıcı varlığı kontrolü nedeniyle erişilemez kalır.
