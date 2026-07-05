---
<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Bülteni

ZecWeekly, her Cuma sabahı gönderilen bir bültendir. Zcash ekosisteminde hafta boyunca yaşanan tüm haberleri içerir.

Haberler her hafta topluluk üyeleri tarafından derlenir ve ilgili tüm bağlantılar bültene eklenir.

Lütfen bültene [buradan](https://zechub.substack.com/) abone olun.

## Katkıda Bulunma

Bültene katkılar, bir katkıcı doğru haftaya ait sayıyı hazırladığında, güncel ödül veya koordinasyon başlığını takip ettiğinde ve haftalık bağlantılar hazır olduktan sonra pull request gönderdiğinde en iyi şekilde işler. Lütfen ZecHub o sayı için tarihi paylaşmadan veya onaylamadan gelecekteki bir sayıyı göndermeyin. Erken açılan pull request'ler genellikle haftanın geç gelen güncellemelerini kaçırır, atanmış bir derleyiciyle çakışır veya yanlış son tarihi kullanır.

### 1. Güncel sayıyı doğrulayın

Yazmaya başlamadan önce:

- Güncel bülten görevi için [ZecHub GitHub issue'larını](https://github.com/ZecHub/zechub/issues) ve [Dework](https://app.dework.xyz/zechub-2424) platformunu kontrol edin.
- Doğru kaynak olarak issue başlığındaki veya görev açıklamasındaki tarihi kullanın.
- Başka bir katkıcının yorum yapıp yapmadığını, atanıp atanmadığını veya bağlantılı bir pull request açıp açmadığını görmek için issue'yu açın.
- Başlamadan önce issue numarası ve sayı tarihi için açık pull request'lerde arama yapın. Örneğin, `is:pr is:open "May 30th" repo:ZecHub/zechub` şeklinde arayın.
- Görev net değilse, tam sayıyı hazırlamadan önce issue içinde, ZecHub Discord'da veya [ZecHub on Twitter](https://twitter.com/ZecHub) üzerinden mesaj atarak sorun.

![Open GitHub issues filtered for current ZecWeekly newsletter tasks](assets/zecweekly-current-task-search.png)

### 2. Depoyu fork edin

GitHub'a yeniyseniz, şu iş akışını kullanın:

1. [ZecHub deposunu](https://github.com/ZecHub/zechub) açın.
2. **Fork** düğmesine tıklayın ve GitHub hesabınız altında bir fork oluşturun.
3. Fork'unuzda, sayı için yeni bir branch oluşturun. `digest-may-30-2026` gibi açık bir branch adı faydalıdır.
4. Pull request'inizin temel depo olarak `ZecHub/zechub` ve temel branch olarak `main` hedeflediğinden emin olun.

Komut satırını kullanıyorsanız, aynı iş akışı şöyle görünür:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Bülten dosyasını oluşturun

Başlangıç noktası olarak [bülten şablonunu](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kullanın. Bülten sayıları [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) klasörüne aittir.

Dosyayı oluştururken:

- Issue'nun istediği veya yakın zamanda kabul edilen sayılarda kullanılan dosya adı biçimini eşleştirin.
- Görev farklı bir biçim istemediği sürece şablondaki bölüm sırasını koruyun.
- Yalnızca ilgili haftadaki bağlantıları ekleyin.
- Okuyucuların neden önemli olduğunu anlayabilmesi için her bağlantı için kısa ve açık bir açıklama yazın.
- Gerekirse İngilizce olmayan kaynakları İngilizceye çevirin veya İngilizce olarak özetleyin.
- Pull request'i açmadan önce her bağlantıyı kontrol edin.

### 4. Bağlantıları doğru zamanda toplayın

ZecWeekly normalde içinde bulunulan haftadaki Zcash ekosistemi faaliyetlerini kapsar ve haftanın sonuna doğru yayımlanır. En güvenli zamanlama şudur:

- Bağlantıları toplamaya, güncel bülten issue'su veya görevi paylaşıldıktan sonra başlayın.
- Hafta hâlâ aktifken bir taslak tutun.
- Haftanın sonundaki güncellemeleri kontrol ettikten sonra, istenen gönderim tarihine yakın bir zamanda pull request'i gönderin.
- O tarihe ait görev mevcut olmadan veya ZecHub size hazırlamanız gerektiğini doğrulamadan gelecek haftanın bültenini göndermeyin.

Bir issue belirli bir tarihe kadar gönderilmesini söylüyorsa, o tarihi takip edin. Bu sayfa ile güncel bir issue arasında çelişki varsa, güncel issue'yu takip edin.

### 5. Pull request'i açın

Bülten dosyanız hazır olduğunda:

1. Değişikliklerinizi fork'unuza commit edin.
2. `main` branch'inde `ZecHub/zechub` deposuna bir pull request açın.
3. `Zcash Ecosystem Digest | May 30th` gibi, sayıyla eşleşen bir başlık kullanın.
4. Gözden geçirenlerin işi görevle ilişkilendirebilmesi için issue'yu pull request gövdesinde bağlantılayın.

Örnek pull request gövdesi:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

Pull request açıldıktan sonra inceleme yorumlarını takip edin. ZecHub düzenleme isterse, aynı sayı için ikinci bir pull request açmak yerine aynı branch'i güncelleyin.

### Gerçek örnekler

Kabul edilmiş gönderim örnekleri olarak birleştirilmiş şu bülten pull request'lerini kullanın:

- [Zcash Ecosystem Digest | 11 Nisan](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | 28 Mart](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | 14 Şubat](https://github.com/ZecHub/zechub/pull/1474)

![Merged ZecWeekly newsletter pull request example](assets/zecweekly-example-pr.png)

Çalışmanızı bir örnekle karşılaştırırken dosya konumuna, başlık biçimine, bölüm sırasına, bağlantı açıklamalarına ve pull request'in doğru göreve bağlanıp bağlanmadığına odaklanın.

### Kaçınılması gereken yaygın hatalar

- Sayı tarihi veya görev onaylanmadan önce pull request açmak.
- Zaten bağlantılı bir pull request'i olan bir issue üzerinde çalışmak.
- Pull request'i `ZecHub/zechub` yerine kendi fork'unuza göndermek.
- Yanlış dosya adını kullanmak veya dosyayı `newsletter` klasörü dışına koymak.
- Eski bir sayıyı kopyalayıp her tarihi, bağlantıyı ve açıklamayı güncellememek.
- Yanlış haftadan bağlantılar eklemek.
- Bozuk bağlantılar, yinelenen bağlantılar veya şablondan kalan yer tutucu metinler bırakmak.
- İnceleme yorumlarından sonra orijinal branch'i güncellemek yerine yeni bir pull request açmak.

### Son kontrol listesi

İnceleme istemeden önce şunları doğrulayın:

- Issue veya görev tarihi, bülten dosyanızla eşleşiyor.
- Aynı issue'yu veya sayıyı kapsayan başka açık bir pull request yok.
- Dosya `newsletter` klasöründe.
- Şablon bölümleri eksiksiz.
- Her bağlantı çalışıyor ve yararlı bir açıklamaya sahip.
- Pull request gövdesi doğru issue'ya bağlantı veriyor.
- Gözden geçirenler değişiklik isterse düzenleme yapabilecek durumdasınız.

## Geçmiş sayılar

[ZecWeekly Arşivi](https://zechub.substack.com/p/archive)
