---
<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# ZecWeekly Bülteni

ZecWeekly, her cuma sabahı yayımlanan bir bültendir. Zcash ekosisteminde hafta boyunca gerçekleşen tüm haberleri içerir.

Haberler her hafta topluluk üyeleri tarafından derlenir ve ilgili tüm bağlantılar bültene eklenir.

Lütfen bültene [buradan](https://zechub.substack.com/) abone olun.

## Katkıda Bulunun

Bültene katkı sunma süreci en iyi şekilde, bir katkıcı doğru haftaya ait sayıyı hazırladığında, güncel ödül veya koordinasyon başlığını takip ettiğinde ve haftalık bağlantılar hazır olduktan sonra pull request gönderdiğinde işler. Lütfen ZecHub o sayı için tarihi paylaşmadan veya onaylamadan gelecekteki bir sayıyı göndermeyin. Erken açılan pull request'ler genellikle haftanın geç gelen güncellemelerini kaçırır, atanmış bir derleyiciyle çakışır veya yanlış son tarihi kullanır.

### 1. Güncel sayıyı doğrulayın

Yazmaya başlamadan önce:

- Güncel bülten görevini görmek için [ZecHub GitHub issues](https://github.com/ZecHub/zechub/issues) ve [Dework](https://app.dework.xyz/zechub-2424) sayfalarını kontrol edin.
- Doğru kaynak olarak issue başlığındaki veya görev açıklamasındaki tarihi kullanın.
- Issue'yu açın ve başka bir katkıcının zaten yorum yapıp yapmadığını, atanıp atanmadığını veya bağlantılı bir pull request açıp açmadığını kontrol edin.
- Başlamadan önce açık pull request'lerde issue numarasını ve sayı tarihini arayın. Örneğin, `is:pr is:open "May 30th" repo:ZecHub/zechub` şeklinde arayın.
- Görev net değilse, tam sayıyı hazırlamadan önce issue içinde, ZecHub Discord'da veya [Twitter'da ZecHub](https://twitter.com/ZecHub)'a mesaj atarak sorun.

![Güncel ZecWeekly bülten görevleri için filtrelenmiş açık GitHub issue'ları](assets/zecweekly-current-task-search.png)

### 2. Repository'yi fork edin

GitHub'da yeniyseniz, şu iş akışını kullanın:

1. [ZecHub repository](https://github.com/ZecHub/zechub) sayfasını açın.
2. **Fork** düğmesine tıklayın ve GitHub hesabınız altında bir fork oluşturun.
3. Kendi fork'unuzda, sayı için yeni bir branch oluşturun. `digest-may-30-2026` gibi açık bir branch adı faydalıdır.
4. Pull request'inizin temel repository olarak `ZecHub/zechub`'u ve temel branch olarak `main`'i hedeflediğinden emin olun.

Komut satırını kullanıyorsanız, aynı iş akışı şu şekilde görünür:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. Bülten dosyasını oluşturun

Başlangıç noktası olarak [bülten şablonunu](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) kullanın. Bülten sayıları [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) klasörüne aittir.

Dosyayı oluştururken:

- Dosya adını issue'da istenen biçime veya yakın zamanda kabul edilmiş sayılarda kullanılan biçime uygun yapın.
- Görev farklı bir biçim istemediği sürece şablondaki bölüm sırasını koruyun.
- Yalnızca ilgili haftadaki bağlantıları ekleyin.
- Okuyucuların neden önemli olduğunu anlayabilmesi için her bağlantı için kısa ve net bir açıklama yazın.
- Gerektiğinde İngilizce olmayan kaynakları İngilizceye çevirin veya İngilizce özetleyin.
- Pull request açmadan önce her bağlantıyı kontrol edin.

### 4. Bağlantıları doğru zamanda toplayın

ZecWeekly normalde içinde bulunulan haftadaki Zcash ekosistemi faaliyetlerini kapsar ve haftanın sonuna doğru yayımlanır. En güvenli zamanlama şudur:

- Bağlantıları toplamaya, güncel bülten issue'su veya görevi yayımlandıktan sonra başlayın.
- Hafta hâlâ devam ederken bir taslak tutun.
- Haftanın sonundaki güncellemeleri kontrol ettikten sonra, istenen gönderim tarihine yakın zamanda pull request'i gönderin.
- O tarihe ait görev mevcut olmadan veya ZecHub onu sizin hazırlamanız gerektiğini doğrulamadan gelecek haftanın bültenini göndermeyin.

Bir issue belirli bir tarihe kadar gönderilmesini söylüyorsa, o tarihi takip edin. Bu sayfa ile güncel bir issue arasında çelişki varsa, güncel issue'yu takip edin.

### 5. Pull request'i açın

Bülten dosyanız hazır olduğunda:

1. Değişikliklerinizi kendi fork'unuza commit edin.
2. `main` branch'indeki `ZecHub/zechub` hedefine bir pull request açın.
3. `Zcash Ecosystem Digest | May 30th` gibi sayıyla eşleşen bir başlık kullanın.
4. İnceleyenlerin çalışmayı görevle ilişkilendirebilmesi için issue'yu pull request gövdesinde bağlantılayın.

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

- [Zcash Ekosistem Özeti | 11 Nisan](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ekosistem Özeti | 28 Mart](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ekosistem Özeti | 14 Şubat](https://github.com/ZecHub/zechub/pull/1474)

![Birleştirilmiş ZecWeekly bülten pull request örneği](assets/zecweekly-example-pr.png)

Çalışmanızı bir örnekle karşılaştırırken, dosya konumuna, başlık biçimine, bölüm sırasına, bağlantı açıklamalarına ve pull request'in doğru göreve geri bağlanıp bağlanmadığına odaklanın.

### Kaçınılması gereken yaygın hatalar

- Sayı tarihi veya görev doğrulanmadan önce pull request açmak.
- Zaten bağlantılı bir pull request'i olan bir issue üzerinde çalışmak.
- Pull request'i `ZecHub/zechub` yerine kendi fork'unuza göndermek.
- Yanlış dosya adı kullanmak veya dosyayı `newsletter` klasörü dışına koymak.
- Eski bir sayıyı kopyalayıp her tarihi, bağlantıyı ve açıklamayı güncellememek.
- Yanlış haftaya ait bağlantılar eklemek.
- Bozuk bağlantılar, yinelenen bağlantılar veya şablondan kalan yer tutucu metinler bırakmak.
- İnceleme yorumlarından sonra orijinal branch'i güncellemek yerine yeni bir pull request açmak.

### Son kontrol listesi

İnceleme istemeden önce şunları doğrulayın:

- Issue veya görev tarihi bülten dosyanızla eşleşiyor.
- Aynı issue'yu veya sayıyı zaten kapsayan başka açık bir pull request yok.
- Dosya `newsletter` klasöründe.
- Şablondaki bölümler tamamlanmış.
- Her bağlantı çalışıyor ve faydalı bir açıklamaya sahip.
- Pull request gövdesi doğru issue'ya bağlantı veriyor.
- İnceleyenler değişiklik isterse düzenleme yapabilecek durumdasınız.

## Geçmiş sayılar

[ZecWeekly Arşivi](https://zechub.substack.com/p/archive)
