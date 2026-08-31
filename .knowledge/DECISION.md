# Decision

Bu dosya, proje kapsamında alınan önemli kararları ve bu kararların etkilerini kaydetmek için kullanılır. Mevcut kararlar için [karar listesi](./decisions/INDEX.md) incelenmelidir. Her karar `.knowledge/decisions/` altında ayrı bir ADR dosyası olarak eklenmelidir.

## Rules

- Karar dosyaları `ADR-NNNN-short-title.md` biçiminde adlandırılmalıdır.
- `name` metadata değeri İngilizce olmalıdır.
- ADR kodları sıralı, benzersiz ve kalıcı olmalıdır; değiştirilemez veya yeniden kullanılamaz.
- Geçersiz kararlar silinmemeli; yerine geçen karar yoksa `deprecated` olarak işaretlenmelidir.
- Yeni bir ADR oluşturulduğunda bağlantısı, ADR kodu sırasına göre [karar listesine](./decisions/INDEX.md) eklenmelidir. ADR adı veya dosya yolu değiştiğinde ilgili bağlantı güncellenmelidir.

## Supersession

- Bir ADR başka bir ADR'nin yerine geçtiğinde önceki ADR `superseded` olarak işaretlenmelidir.
- Yeni ADR'nin `supersedes` alanı önceki ADR kodunu, önceki ADR'nin `supersededBy` alanı ise yeni ADR kodunu içermelidir. İlişkisi bulunmayan ADR'lere bu alanlar eklenmemelidir.
- `supersedes` veya `supersededBy` alanı bulunan ADR'lere `Relations` bölümü eklenmeli; ilgili ADR dosyaları `Supersedes` ve `Superseded by` etiketleriyle göreli olarak bağlanmalıdır.

## Template

```markdown
---
id: ADR-NNNN
name: Decision short name
status: accepted
createdAt: YYYY-MM-DDTHH:mm:ss±HH:mm
updatedAt: YYYY-MM-DDTHH:mm:ss±HH:mm
---

## Context

Kararın alınmasını gerektiren durumu açıklayın.

## Decision

Alınan kararı açıkça yazın.

## Consequences

Kararın proje üzerindeki önemli etkilerini yazın.

```