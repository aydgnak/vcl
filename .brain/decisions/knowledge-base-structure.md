---
created_at: 2026-06-14 17:10 +03:00
---

# Knowledge Base Yapısı

## Status
Kabul edildi

## Decision
`.brain/` klasörü projenin kalıcı knowledge base alanı olarak kullanılır. Standart klasör yapısı:

```text
.brain/
├── context/
├── decisions/
├── notes/
├── references/
└── templates/
```

## Rationale
- Proje bilgisi, kararlar, notlar ve uzun vadeli bağlam merkezi bir yerde tutulur.
- `AGENTS.md` içindeki KNB kuralları bu yapıyı zorunlu kılar.
- Her çalışmaya başlamadan önce `.brain/` kontrol edilir (KNB-02).

## Outcomes
- Dosya isimleri İngilizce `kebab-case` formatında olur.
- Dosya içerikleri Türkçe yazılır.
- Wikilink formatı (`[[page-name]]`) ile sayfalar arası bağlantılar kurulur.
- Yeni dosyalar `.brain/templates/` içindeki ilgili şablona göre oluşturulur.

## Related Pages
- [[project-overview]]
