---
id: ADR-0003
name: Use shared Valibot schemas
status: accepted
createdAt: 2026-08-31T10:58:29+03:00
updatedAt: 2026-08-31T10:58:29+03:00
---

## Context

İstemci ve API aynı request verisini farklı yerlerde doğruladığında kuralların ayrışması ve TypeScript tiplerinin runtime doğrulamasını temsil etmemesi riski oluşur. Projede hem doğrulama hem de inferred type ihtiyaçları vardır.

## Decision

Paylaşılan request ve configuration şemaları `packages/schemas` paketinde Valibot ile tanımlanacaktır. Uygulamalar bu paketi `workspace:*` bağımlılığıyla tüketecektir. Backend, HTTP request doğrulamasını `ValibotPipe` ile bu şemalar üzerinden yapacaktır.

## Consequences

Şemalar runtime validation ile TypeScript tipleri için tek kaynak olur ve uygulamalar arası contract drift azalır. Paylaşılan schema değişiklikleri ilgili tüm istemci ve API tüketicileriyle birlikte değerlendirilmelidir. Paket, hem ESM hem CommonJS tüketicileri için build edilmek zorundadır; bu da package build sırasını gerekli kılar.
