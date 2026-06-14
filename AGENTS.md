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

## Skills (SKL)

- **SKL-01** - İşin kapsamına uygun bir skill varsa, çalışmaya başlamadan önce ilgili skill değerlendirilir ve gerekiyorsa kullanılır.
- **SKL-02** - Bun scriptleri, dependency yönetimi, test veya build işleri için `Bun` skill'i kullanılır.
- **SKL-03** - Monorepo, workspace, Turborepo/Nx veya shared dependency işleri için `monorepo-management` skill'i kullanılır.
- **SKL-04** - NestJS kodu yazma, inceleme veya refactor işlerinde `nestjs-best-practices` skill'i kullanılır.
- **SKL-05** - Validation, parsing ve runtime type safety işlerinde yalnızca `valibot` kullanılır; ilgili işlerde `valibot` skill'i kullanılır.
- **SKL-06** - UI/UX, görsel tasarım, interaction, accessibility, responsive davranış veya frontend polish içeren işlerde ilgili UI skill'i değerlendirilir.
- **SKL-07** - Landing page, portfolio, marketing sayfası veya redesign işlerinde `design-taste-frontend` veya `frontend-design` skill'i kullanılır.
- **SKL-08** - Ürün arayüzü, dashboard, form, component, UX review veya genel UI kalite işleri için `ui-ux-pro-max` veya `impeccable` skill'i kullanılır.
- **SKL-09** - Responsive layout, container query, fluid typography veya mobile-first düzen işleri için `responsive-design` skill'i kullanılır.
- **SKL-10** - UI animation, micro-interaction veya motion polish işleri için `emil-design-eng` skill'i kullanılır.
- **SKL-11** - Bir iş birden fazla kapsama giriyorsa ilgili tüm skill'ler birlikte değerlendirilebilir ve gerektiğinde birden fazla skill aynı çalışmada kullanılabilir.

## Work Completion (WCP)

- **WCP-01** - Her işin sonunda, yapılan çalışmanın `.brain/` içine kaydedilmesi gereken kalıcı proje bilgisi, karar, not veya uzun vadeli bağlam üretip üretmediği değerlendirilir.
- **WCP-02** - `.brain/` içine kayıt gerekiyorsa, ilgili dosya `.brain/templates/` içindeki uygun şablona göre oluşturulur veya güncellenir.
- **WCP-03** - `.brain/` güncellemeleri `KNB` kurallarına uygun şekilde İngilizce `kebab-case` dosya adı, Türkçe içerik ve gerektiğinde wikilink formatı kullanılarak yapılır.

## Quality Gate (QGT)

- **QGT-01** - Her iş tamamlandıktan sonra sırasıyla `lint:fix`, `typecheck` ve `build` scriptleri çalıştırılır.
- **QGT-02** - `lint:fix` sonrasında oluşan dosya değişiklikleri kontrol edilir.
- **QGT-03** - `lint:fix`, `typecheck` veya `build` çıktısında hata ya da uyarı varsa düzeltilir.
- **QGT-04** - Düzeltme yapıldıysa ilgili script tekrar çalıştırılır.
- **QGT-05** - Bu scriptler başarılı tamamlanmadan iş tamamlanmış sayılmaz.

## Git (GIT)

- **GIT-01** - User açıkça istemedikçe commit oluşturma veya remote'a pushlama.
- **GIT-02** - User commit message isterse önce son 20 commit message'ı incele.
- **GIT-03** - Yeni commit message'ı mevcut commit history içindeki style ve convention'a uygun yaz.
