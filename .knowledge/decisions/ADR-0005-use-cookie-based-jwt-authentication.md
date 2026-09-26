---
id: ADR-0005
name: Use cookie-based JWT authentication
status: accepted
createdAt: 2026-08-31T10:58:29+03:00
updatedAt: 2026-09-27T02:20:18+03:00
---

## Context

API endpoint'leri varsayılan olarak yetkilendirilmiş kullanıcı gerektirir. Authentication token'ının istemci tarafındaki JavaScript'e doğrudan açılmadan taşınması ve public endpoint'lerin görünür biçimde istisna olması gerekir.

## Decision

Authentication için JWT kullanılacak ve token `accessToken` adlı `httpOnly` cookie içinde taşınacaktır. JWT guard, `APP_GUARD` olarak uygulama geneline kaydedilecektir; yalnızca `@Public()` ile işaretlenen endpoint'ler authentication gerektirmez. Cookie, production ortamında `secure` ve tüm ortamlarda `sameSite=lax` olarak ayarlanacaktır. Her doğrulanmış JWT'de kullanıcı varlığı yeniden kontrol edilecektir. Girişte ayrı secret ve süreyle imzalanan `refreshToken` adlı bir `httpOnly` cookie de üretilecektir. Cookie `Path` ile sınırlandırılmadığından tarayıcı tarafından uygun isteklerde gönderilebilir; refresh işlemi `/auth/refresh` endpoint'inde yapılır ve yeni access token üretir.

## Consequences

Endpoint'ler varsayılan olarak korunur ve token istemci JavaScript'i tarafından okunamaz. Cookie tabanlı authentication nedeniyle frontend-backend origin, proxy ve CSRF etkileri endpoint tasarımında değerlendirilmelidir. Kullanıcının her request'te yeniden doğrulanması silinen kullanıcıların token'larının kullanılmasını engeller; buna karşılık ek bir veri erişimi maliyeti getirir. Refresh token stateless olduğundan oturum sonlandırma veya refresh token rotasyonu desteklenmez; bunlar gerektiğinde token kayıt/iptal mekanizmasıyla ayrıca ele alınmalıdır.
