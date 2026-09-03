# AI Agent Rules

## Security Rules

- **SEC-001:** Secret key, API key, access token, password vb. sensitive data source code içinde hard-code edilmemeli.
- **SEC-002:** Sensitive data `.env` dosyasında tutulmalı ve bu dosya version control sistemine eklenmemeli.
- **SEC-003:** `.env.example` dosyası yalnızca gerekli environment variable adlarını ve güvenli placeholder değerleri içermeli; gerçek sensitive data içermemeli.

## Knowledge Base Rules

- Projenin `knowledge base` içeriği `.knowledge/` dizininde tutulur.
- Her göreve başlamadan önce [knowledge base giriş belgesini](./.knowledge/README.md) oku ve yönlendirdiği ilgili belgelerdeki kuralları uygula.

## Quality Rules

- **QLT-001:** Kod değişikliği gerektiren işler tamamlandıktan sonra, değişiklik yapılan her workspace paketinin kendi dizininde sırasıyla `pnpm run lint:fix`, `pnpm run typecheck` ve `pnpm run build` çalıştırılmalı. Monoreponun tamamını çalıştıran kök komutlar kullanılmamalı.
- **QLT-002:** Etkilenen paketlerdeki bu kontrollerden herhangi biri hata verirse hata giderilmeli ve o paketin üç kontrolü de yeniden çalıştırılmalı.
- **QLT-003:** Etkilenen her pakette üç kontrolün tamamı başarıyla sonuçlanmadan iş tamamlanmış veya başarılı kabul edilmemeli. Kontroller ortam kaynaklı bir nedenle çalıştırılamıyorsa bu durum kullanıcıya açıkça bildirilmeli.

## Git Rules

- Kullanıcı açıkça belirtmedikçe commit oluşturma ve push etme.
- Commit mesajı istendiğinde aşağıdaki kurallara göre commit mesajını ver.
    - Staged değişiklik varsa commit mesajını yalnızca staged değişikliklere göre öner; unstaged ve untracked değişiklikleri bu mesaja dahil etme.
    - Staged değişiklik yoksa commit mesajını unstaged ve untracked tüm değişikliklere göre öner.
    - Son 20 commit'in yalnızca mesajlarını oku
    - Mevcut değişikliklere ve kullanılan commit mesaj kalıplarına uygun bir mesaj öner
    - Commit mesajı aşağıdaki dillere göre ver
        - İngilizce
        - Türkçe
