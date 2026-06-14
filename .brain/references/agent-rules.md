---
created_at: 2026-06-14 17:10 +03:00
---

# Agent Kuralları Referansı

## Source
`AGENTS.md` — proje kök dizini.

## Usage
Tüm agent işlemlerinde bu kurallar referans alınır.

## Important Notes

### Security (SEC)
- **SEC-01** — Gerçek secret veya local sensitive configuration bilgilerini asla commit etme.
- **SEC-02** — Secret, credential, API key, token, password, private key veya benzeri sensitive bilgileri source code içine yazma.
- **SEC-03** — Sensitive configuration bilgilerini yalnızca `.env` dosyasında tut.
- **SEC-04** — `.env` dosyasının `.gitignore` içinde yer aldığından emin ol.
- **SEC-05** — Template ve example değerleri `.env.example` dosyasına yaz.

### Knowledge Base (KNB)
- **KNB-01** — `.brain/` klasörü projenin knowledge base alanıdır.
- **KNB-02** — Her çalışmaya başlamadan önce `.brain/` klasörü kontrol edilir.
- **KNB-05** — Standart klasör yapısı: `context/`, `decisions/`, `notes/`, `references/`, `templates/`.
- **KNB-06** — Dosyalar ilgili şablona göre yazılır.
- **KNB-07** — Dosya isimleri İngilizce `kebab-case`.
- **KNB-08** — Dosya içerikleri Türkçe.
- **KNB-09** — Wikilink formatı (`[[page-name]]`) kullanılır.

### Git (GIT)
- **GIT-01** — User açıkça istemedikçe commit oluşturma veya push yapma.
- **GIT-02** — Commit message istenirse önce son 20 commit incelenir.
- **GIT-03** — Yeni commit message mevcut history style'ına uygun yazılır.

## Related Pages
- [[project-overview]]
- [[knowledge-base-structure]]
