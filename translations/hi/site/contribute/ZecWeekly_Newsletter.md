<a href="https://github.com/zechub/zechub/edit/main/site/contribute/ZecWeekly_Newsletter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# ZecWeekly न्यूज़लेटर

ZecWeekly एक न्यूज़लेटर है जो हर शुक्रवार सुबह भेजा जाता है। इसमें Zcash इकोसिस्टम में सप्ताह के दौरान हुई सभी खबरें शामिल होती हैं।

समाचारों का साप्ताहिक संकलन समुदाय के सदस्य करते हैं और सभी प्रासंगिक लिंक न्यूज़लेटर में जोड़े जाते हैं।

कृपया न्यूज़लेटर की सदस्यता [यहाँ](https://zechub.substack.com/) लें।

## योगदान करें

न्यूज़लेटर में योगदान सबसे अच्छा तब काम करता है जब एक योगदानकर्ता सही सप्ताह के लिए संस्करण तैयार करे, वर्तमान bounty या समन्वय thread का पालन करे, और साप्ताहिक लिंक तैयार होने के बाद pull request जमा करे। कृपया ZecHub द्वारा उस संस्करण की तिथि पोस्ट या पुष्टि करने से पहले किसी भविष्य के संस्करण को जमा न करें। जल्दी खोले गए pull request अक्सर सप्ताह के अंतिम अपडेट छूट जाते हैं, किसी नियुक्त curator से टकरा जाते हैं, या गलत deadline का उपयोग करते हैं।

### 1. वर्तमान संस्करण की पुष्टि करें

लिखना शुरू करने से पहले:

- वर्तमान न्यूज़लेटर कार्य के लिए [ZecHub GitHub issues](https://github.com/ZecHub/zechub/issues) और [Dework](https://app.dework.xyz/zechub-2424) देखें।
- issue शीर्षक या task description में दी गई तिथि को अंतिम सत्य मानें।
- issue खोलें और देखें कि क्या किसी अन्य योगदानकर्ता ने पहले से टिप्पणी की है, उसे assigned किया गया है, या उसने कोई linked pull request खोला है।
- शुरू करने से पहले issue number और संस्करण की तिथि के लिए खुले pull requests खोजें। उदाहरण के लिए, `is:pr is:open "May 30th" repo:ZecHub/zechub` खोजें।
- यदि task स्पष्ट न हो, तो पूरा संस्करण तैयार करने से पहले issue में, ZecHub Discord में, या [ZecHub on Twitter](https://twitter.com/ZecHub) को संदेश भेजकर पूछें।

![वर्तमान ZecWeekly न्यूज़लेटर कार्यों के लिए फ़िल्टर किए गए खुले GitHub issues](assets/zecweekly-current-task-search.png)

### 2. repository को Fork करें

यदि आप GitHub पर नए हैं, तो यह workflow अपनाएँ:

1. [ZecHub repository](https://github.com/ZecHub/zechub) खोलें।
2. **Fork** पर क्लिक करें और अपने GitHub account के अंतर्गत एक fork बनाएँ।
3. अपने fork में, इस संस्करण के लिए एक नई branch बनाएँ। एक स्पष्ट branch name उपयोगी होता है, जैसे `digest-may-30-2026`।
4. सुनिश्चित करें कि आपका pull request base repository के रूप में `ZecHub/zechub` और base branch के रूप में `main` को target करेगा।

यदि आप command line का उपयोग करते हैं, तो यही workflow इस प्रकार दिखता है:

```bash
git clone https://github.com/YOUR-USERNAME/zechub.git
cd zechub
git checkout -b digest-month-day-year
```

### 3. न्यूज़लेटर फ़ाइल बनाएँ

शुरुआत के लिए [newsletter template](https://github.com/ZecHub/zechub/blob/main/newsletter/newslettertemplate.md) का उपयोग करें। न्यूज़लेटर के संस्करण [`newsletter`](https://github.com/ZecHub/zechub/tree/main/newsletter) फ़ोल्डर में होने चाहिए।

फ़ाइल बनाते समय:

- issue में माँगे गए या हाल ही में स्वीकार किए गए संस्करणों में उपयोग किए गए filename format से मेल रखें।
- जब तक task किसी अलग format के लिए न कहे, template की वही section order बनाए रखें।
- केवल संबंधित सप्ताह के लिंक जोड़ें।
- हर लिंक के लिए छोटा, स्पष्ट विवरण लिखें ताकि पाठक समझ सकें कि वह क्यों महत्वपूर्ण है।
- आवश्यकता होने पर गैर-अंग्रेज़ी स्रोतों का अंग्रेज़ी में अनुवाद या सारांश दें।
- pull request खोलने से पहले हर लिंक की जाँच करें।

### 4. सही समय पर लिंक एकत्र करें

ZecWeekly सामान्यतः वर्तमान सप्ताह की Zcash इकोसिस्टम गतिविधि को कवर करता है और सप्ताह के अंत के पास प्रकाशित होता है। सबसे सुरक्षित समय यह है:

- वर्तमान न्यूज़लेटर issue या task पोस्ट होने के बाद लिंक एकत्र करना शुरू करें।
- जब तक सप्ताह सक्रिय है, एक draft बनाए रखें।
- सप्ताह के अंत के अपडेट जाँच लेने के बाद, अनुरोधित submission date के करीब pull request जमा करें।
- उस तिथि के लिए task मौजूद होने से पहले या ZecHub द्वारा यह पुष्टि करने से पहले कि आपको इसे तैयार करना चाहिए, अगले सप्ताह का न्यूज़लेटर जमा न करें।

यदि किसी issue में किसी विशेष तिथि तक जमा करने को कहा गया है, तो उसी तिथि का पालन करें। यदि इस पृष्ठ और किसी वर्तमान issue के बीच टकराव हो, तो वर्तमान issue का पालन करें।

### 5. pull request खोलें

जब आपकी न्यूज़लेटर फ़ाइल तैयार हो जाए:

1. अपने fork में अपने changes commit करें।
2. `main` branch पर `ZecHub/zechub` में एक pull request खोलें।
3. ऐसा शीर्षक उपयोग करें जो संस्करण से मेल खाता हो, जैसे `Zcash Ecosystem Digest | May 30th`।
4. pull request body में issue को link करें ताकि reviewers कार्य को task से जोड़ सकें।

उदाहरण pull request body:

```md
Closes #ISSUE_NUMBER

Summary:
- Adds the Zcash Ecosystem Digest for Month Day.
- Uses the newsletter template and the current issue deadline.
- Checks links and descriptions for the requested week.
```

pull request खुल जाने के बाद, review comments पर नज़र रखें। यदि ZecHub edits के लिए कहे, तो उसी संस्करण के लिए दूसरा pull request खोलने के बजाय उसी branch को update करें।

### वास्तविक उदाहरण

स्वीकृत submissions के उदाहरण के रूप में इन merged newsletter pull requests का उपयोग करें:

- [Zcash Ecosystem Digest | April 11th](https://github.com/ZecHub/zechub/pull/1551)
- [Zcash Ecosystem Digest | March 28th](https://github.com/ZecHub/zechub/pull/1544)
- [Zcash Ecosystem Digest | February 14th](https://github.com/ZecHub/zechub/pull/1474)

![मर्ज किए गए ZecWeekly न्यूज़लेटर pull request का उदाहरण](assets/zecweekly-example-pr.png)

अपने कार्य की किसी उदाहरण से तुलना करते समय, फ़ाइल स्थान, शीर्षक format, section order, लिंक विवरण, और क्या pull request सही task से वापस जुड़ता है, इन बातों पर ध्यान दें।

### बचने योग्य सामान्य गलतियाँ

- संस्करण की तिथि या task की पुष्टि होने से पहले pull request खोलना।
- ऐसे issue पर काम करना जिसके साथ पहले से कोई linked pull request मौजूद हो।
- `ZecHub/zechub` के बजाय अपने स्वयं के fork में pull request जमा करना।
- गलत फ़ाइल नाम का उपयोग करना या फ़ाइल को `newsletter` फ़ोल्डर के बाहर रखना।
- हर तिथि, लिंक और विवरण को update किए बिना किसी पुराने संस्करण की नकल करना।
- गलत सप्ताह के लिंक जोड़ना।
- टूटे हुए लिंक, duplicate links, या template का placeholder text छोड़ देना।
- review comments के बाद मूल branch को update करने के बजाय नया pull request खोलना।

### अंतिम जाँच सूची

review माँगने से पहले पुष्टि करें कि:

- issue या task की तिथि आपकी न्यूज़लेटर फ़ाइल से मेल खाती है।
- कोई अन्य खुला pull request पहले से उसी issue या संस्करण को cover नहीं कर रहा है।
- फ़ाइल `newsletter` फ़ोल्डर में है।
- template की sections पूरी हैं।
- हर लिंक काम करता है और उसका उपयोगी विवरण है।
- pull request body सही issue को link करती है।
- यदि reviewers changes माँगें तो आप edits करने के लिए उपलब्ध हैं।

## पिछले संस्करण

[ZecWeekly Archive](https://zechub.substack.com/p/archive)
