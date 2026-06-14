# Agent Rules

## Security (SEC)

- **SEC-01** - Gerçek secret veya local sensitive configuration bilgilerini asla commit etme.
- **SEC-02** - Secret, credential, API key, token, password, private key veya benzeri sensitive bilgileri project source code içine yazma.
- **SEC-03** - Sensitive configuration bilgilerini yalnızca `.env` dosyasında tut.
- **SEC-04** - `.env` dosyasının `.gitignore` içinde yer aldığından emin ol.
- **SEC-05** - Template ve example değerleri `.env.example` dosyasına yaz; gerçek secret değerleri ekleme.

## Knowledge Base (KNB)

- **KNB-01** - `.brain/` klasörü projenin knowledge base alanıdır.
- **KNB-02** - Her çalışmaya başlamadan önce `.brain/` klasörü muhakkak kontrol edilir.
- **KNB-03** - Proje bilgisi, kararlar, notlar ve uzun vadeli bağlam `.brain/` içinde tutulur.
- **KNB-04** - Kalıcı proje bilgisi, karar veya önemli bağlam oluştuğunda `.brain/` güncellenir.
- **KNB-05** - `.brain/` içinde standart klasör yapısı kullanılır:
  ```text
  .brain/
  ├── context/
  ├── decisions/
  ├── notes/
  ├── references/
  └── templates/
  ```
- **KNB-06** - `.brain/` içinde oluşturulacak dosyalar, `.brain/templates/` içindeki ilgili şablona göre yazılır.
- **KNB-07** - `.brain/` içinde oluşturulan sayfa ve dosya isimleri İngilizce ve `kebab-case` olmalıdır.
- **KNB-08** - `.brain/` içindeki dosya içerikleri Türkçe yazılmalı ve Türkçe karakterler doğru şekilde korunmalıdır.
- **KNB-09** - `.brain/` içindeki notlarda ilişkili sayfa ve kavramlara bağlantı vermek için wikilink formatı kullanılır: `[[page-name]]`.

## Git (GIT)

- **GIT-01** - User açıkça istemedikçe commit oluşturma veya remote'a pushlama.
- **GIT-02** - User commit message isterse önce son 20 commit message'ı incele.
- **GIT-03** - Yeni commit message'ı mevcut commit history içindeki style ve convention'a uygun yaz.
