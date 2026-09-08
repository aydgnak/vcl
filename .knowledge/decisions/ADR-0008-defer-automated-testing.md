---
id: ADR-0008
name: Defer automated testing
status: accepted
createdAt: 2026-09-08T12:27:36+03:00
updatedAt: 2026-09-08T12:27:36+03:00
---

## Context

Projede henüz kabul edilmiş bir test stratejisi veya test altyapısı yoktur. AI Agent'ların görevler sırasında kendiliğinden test oluşturması, kullanıcı bu testleri istemediğinde ekleme ve kaldırma işlemlerinin tekrarlanmasına neden olur. Bu durum gereksiz değişiklik, bakım yükü ve geliştirme sürecinde belirsizlik yaratır.

## Decision

Test stratejisi kabul edilene kadar projeye otomatik test eklenmeyecektir. AI Agent'lar test dosyası, test runner, test dependency, test configuration, test script'i, fixture, mock veya coverage altyapısı oluşturmayacak ve mevcut uygulama koduna test amacıyla değişiklik yapmayacaktır.

Bu karar, `lint:fix`, `typecheck`, `build` ve kullanıcı tarafından açıkça istenen manuel doğrulama adımlarını kapsamaz. Kullanıcı belirli bir görev için açıkça test isterse yalnızca o görev kapsamında test eklenebilir.

Test yapısına geçildiğinde bu ADR değiştirilmeden korunacaktır. Yeni test stratejisini tanımlayan ADR, bu ADR'nin yerine geçecek ve supersession kurallarına göre ilişkilendirilecektir.

## Consequences

AI Agent'lar uygulama değişiklikleri için varsayılan olarak test üretmez; bu nedenle test ekleme ve kaldırma döngüsü sona erer. Proje, ileride test framework'ü, kapsamı, konumu ve çalıştırma kuralları netleştiğinde ayrı bir ADR ile kontrollü biçimde test yapısına geçebilir. Bu zamana kadar davranış doğrulaması lint, typecheck, build ve gerektiğinde manuel kontrollerle sağlanır.
