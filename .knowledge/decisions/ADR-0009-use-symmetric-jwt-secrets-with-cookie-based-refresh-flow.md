---
id: ADR-0009
name: Use symmetric JWT secrets with cookie-based refresh flow
status: accepted
createdAt: 2026-09-27T02:20:18+03:00
updatedAt: 2026-09-27T02:20:18+03:00
supersedes: ADR-0007
---

## Relations

- Supersedes [ADR-0007: Use asymmetric access token signing](./ADR-0007-use-asymmetric-access-token-signing.md).

## Context

Auth yapısı, frontend ile backend arasında access token imzalama anahtarlarının paylaşılmasına dayanmayan cookie tabanlı bir akışa geçirildi. Eski karar, uygulamanın kullandığı token algoritmalarını, secret yapılandırmasını ve frontend doğrulama davranışını artık yansıtmıyor.

## Decision

Access ve refresh token'lar ayrı environment secret'ları kullanılarak `HS256` ile imzalanacaktır. Backend, `JWT_ACCESS_TOKEN_SECRET` ve `JWT_REFRESH_TOKEN_SECRET` değerlerini kendi ortamında tutar; süreler `JWT_ACCESS_TOKEN_EXPIRES_IN` ve `JWT_REFRESH_TOKEN_EXPIRES_IN` ile yapılandırılır. Frontend'e JWT signing secret'ı verilmez.

Login, `accessToken` ve `refreshToken` adlı `httpOnly` cookie'leri oluşturur. İki cookie de production ortamında `secure`, tüm ortamlarda `sameSite=lax` olarak ayarlanır. `/auth/refresh`, refresh cookie'sini doğrulayarak yalnızca yeni access token cookie'si üretir; refresh token rotasyonu yapılmaz. Logout frontend tarafında iki cookie'yi siler.

Backend JWT guard uygulama genelinde varsayılan olarak aktiftir; `@Public()` ile işaretlenen endpoint'ler hariçtir. Backend access ve refresh token'ları ayrı stratejilerle doğrular ve doğrulanmış kullanıcıyı veritabanında yeniden kontrol eder. Frontend Proxy, access token olmayan korumalı route için refresh denemesi yapar; access token mevcutken korumalı route'larda token doğrulamasını kendisi yapmaz. Proxy, access token'ı yalnızca public route veya `/` adresindeyken `/user/me` üzerinden doğrular. Frontend API istemcisi API'den `401` aldığında tek bir refresh isteği yapar, bekleyen istekleri koordine eder ve başarısız olursa kullanıcıyı login sayfasına yönlendirir.

## Consequences

Frontend ile backend arasında public/private key üretimi ve dağıtımı gerekmez; signing secret'ları yalnızca backend'de tutulur. Frontend route erişimi ile API authorization farklı kontrollerdir: access token varlığı Proxy'de tek başına kriptografik doğrulama sağlamaz, ancak backend korumalı endpoint'leri kendi guard'ı ile doğrular. Refresh token stateless ve rotasyonsuz olduğundan token iptali veya oturum yönetimi desteklenmez. Secret'lar `.env` dosyalarında veya deployment secret mekanizmalarında güvenli biçimde sağlanmalı; gerçek değerler repository'ye eklenmemelidir.
