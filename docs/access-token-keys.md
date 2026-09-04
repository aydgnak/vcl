# Access Token Keys

Bu proje access token'ları `RS256` ile imzalar. Backend, imzalama için private key'i kullanır; frontend yalnızca token doğrulamak için public key'i kullanır.

## Generate Keys

Anahtarları repository dışında oluşturun:

```bash
umask 077

mkdir -p "$HOME/.config/vcl/keys"

openssl genpkey \
  -algorithm RSA \
  -pkeyopt rsa_keygen_bits:2048 \
  -out "$HOME/.config/vcl/keys/access-token-private.pem"

openssl pkey \
  -in "$HOME/.config/vcl/keys/access-token-private.pem" \
  -pubout \
  -out "$HOME/.config/vcl/keys/access-token-public.pem"
```

Bu komutlar `access-token-private.pem` ve ondan türetilen `access-token-public.pem` dosyalarını oluşturur. Private key yalnızca sizin erişebildiğiniz bir yerde kalmalıdır.

## Encode Keys

Environment variable değerleri PEM dosyalarının tek satır Base64 gösterimidir. Değerleri üretmek için aşağıdaki komutları çalıştırın:

```bash
openssl base64 \
  -A \
  -in "$HOME/.config/vcl/keys/access-token-private.pem"

openssl base64 \
  -A \
  -in "$HOME/.config/vcl/keys/access-token-public.pem"
```

Her komutun çıktısını eksiksiz kopyalayın. Satır sonu eklemeyin.

## Configure Development

Backend için `apps/backend/.env` dosyasına iki değeri ekleyin:

```dotenv
JWT_ACCESS_TOKEN_PRIVATE_KEY="<PRIVATE_KEY_BASE64>"
JWT_ACCESS_TOKEN_PUBLIC_KEY="<PUBLIC_KEY_BASE64>"
```

Frontend için `apps/frontend/.env` dosyasına yalnızca aynı public key değerini ekleyin:

```dotenv
JWT_ACCESS_TOKEN_PUBLIC_KEY="<PUBLIC_KEY_BASE64>"
```

Değişikliklerden sonra backend ve frontend geliştirme sunucularını yeniden başlatın. Yeni anahtarlara geçildiğinde, önceki anahtarla imzalanmış access token'lar geçersiz olur ve kullanıcıların yeniden giriş yapması gerekir.

## Security

`JWT_ACCESS_TOKEN_PRIVATE_KEY` değerini frontend'e, `.env.example` dosyalarına veya Git'e eklemeyin. `JWT_ACCESS_TOKEN_PUBLIC_KEY` frontend'de kullanılabilir; imzalama yetkisi vermez.

Canlı ortamda private key'i deployment platformunun gizli environment variable veya secret alanında tanımlayın. Örneğin Vercel Environment Variables, GitHub Actions Secrets, Docker Secrets veya Kubernetes Secrets kullanılabilir. Yerel geliştirmede ise yukarıdaki `.env` dosyası yeterlidir.
