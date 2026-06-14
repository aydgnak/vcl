# Agent Rules

## Security

- Secret, credential, API key, token, password, private key veya benzeri sensitive bilgileri project source code içine yazma.
- Sensitive configuration bilgilerini yalnızca `.env` dosyasında tut.
- `.env` dosyasının `.gitignore` içinde yer aldığından emin ol.
- Template ve example değerleri `.env.example` dosyasına yaz; gerçek secret değerleri ekleme.
- Gerçek secret veya local sensitive configuration bilgilerini asla commit etme.

## Git

- User açıkça istemedikçe commit oluşturma veya remote'a pushlama.
- User commit message isterse önce son 20 commit message'ı incele.
- Yeni commit message'ı mevcut commit history içindeki style ve convention'a uygun yaz.
