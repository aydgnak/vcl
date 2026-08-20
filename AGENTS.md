# AI Agent Rules

## Security Rules

- **SEC-001:** Secret key, API key, access token, password vb. sensitive data source code içinde hard-code edilmemeli.
- **SEC-002:** Sensitive data `.env` dosyasında tutulmalı ve bu dosya version control sistemine eklenmemeli.
- **SEC-003:** `.env.example` dosyası yalnızca gerekli environment variable adlarını ve güvenli placeholder değerleri içermeli; gerçek sensitive data içermemeli.

## Knowledge Rules

- **KNW-001:** `.knowledge` klasörü projenin beyni ve merkezi bilgi kaynağıdır.

## Git Rules

- **GIT-001:** Kullanıcı açıkça belirtmedikçe commit oluşturma ve push etme.
- **GIT-002:** Commit message istendiğinde staged, unstaged ve untracked tüm değişiklikleri kontrol et; son 20 commit'in yalnızca message'larını oku ve mevcut değişikliklere ve kullanılan commit message kalıplarına uygun bir message öner.
