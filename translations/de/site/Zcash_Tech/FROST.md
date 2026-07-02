<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# FROST 


## Was ist eine Schnorr-Signatur?

Eine digitale Schnorr-Signatur ist eine Menge von Algorithmen: (KeyGen, Sign, Verify).

Schnorr-Signaturen haben mehrere Vorteile. Ein wesentlicher Vorteil ist, dass, wenn mehrere Schlüssel verwendet werden, um dieselbe Nachricht zu signieren, die resultierenden Signaturen zu einer einzigen Signatur kombiniert werden können. Dies kann verwendet werden, um die Größe von Multisig-Zahlungen und anderen mit Multisig verbundenen Transaktionen erheblich zu reduzieren.


## Was ist FROST?

**Flexible Round-Optimized Schnorr Threshold Signatures** -
*Erstellt von Chelsea Komlo (University of Waterloo, Zcash Foundation) & Ian Goldberg (University of Waterloo).*

FROST ist ein Schwellenwert-Signatur- und verteiltes Schlüsselerzeugungsprotokoll, das eine minimale Anzahl an Kommunikationsrunden bietet und sicher parallel ausgeführt werden kann. Das FROST-Protokoll ist eine Schwellenwert-Version des Schnorr-Signaturschemas.

Im Gegensatz zu Signaturen in einem Einzelparteien-Setting erfordern Schwellenwert-Signaturen die Zusammenarbeit einer Schwellenanzahl von Unterzeichnern, die jeweils einen Anteil eines gemeinsamen privaten Schlüssels halten. 

[Was sind Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Folglich erzeugt das Generieren von Signaturen in einem Schwellenwert-Setting zusätzlichen Aufwand durch Netzwerkrunden zwischen den Unterzeichnern, was kostspielig ist, wenn geheime Anteile auf netzwerkbeschränkten Geräten gespeichert sind oder wenn die Koordination über unzuverlässige Netzwerke erfolgt.

Der Netzwerk-Overhead während Signiervorgängen wird durch eine neuartige Technik reduziert, die vor Fälschungsangriffen schützt, die auch auf andere Schemata anwendbar sind.
 
FROST verbessert bestehende Schwellenwert-Signaturprotokolle, da eine unbegrenzte Anzahl von Signiervorgängen sicher parallel (konkurrent) ausgeführt werden kann.
 
Es kann entweder als 2-Runden-Protokoll verwendet werden, bei dem Unterzeichner insgesamt 2 Nachrichten senden und empfangen, oder mit einer Vorverarbeitungsphase zu einem Single-Round-Signaturprotokoll optimiert werden. 

FROST erreicht seine Effizienzverbesserungen unter anderem dadurch, dass das Protokoll bei Anwesenheit eines fehlverhaltenden Teilnehmers abgebrochen werden darf (der dann identifiziert und von zukünftigen Vorgängen ausgeschlossen wird).
 
Sicherheitsbeweise, die zeigen, dass FROST gegen Chosen-Message-Angriffe sicher ist, unter der Annahme, dass das Problem des diskreten Logarithmus schwer ist und der Angreifer weniger Teilnehmer als den Schwellenwert kontrolliert, finden sich [hier](https://eprint.iacr.org/2020/852.pdf#page=16).


## Wie funktioniert FROST?

Das FROST-Protokoll enthält zwei wichtige Komponenten:

Zunächst führen n Teilnehmer ein *Distributed Key Generation (DKG)-Protokoll* aus, um einen gemeinsamen Verifizierungsschlüssel zu erzeugen; am Ende erhält jeder Teilnehmer einen Anteil des privaten geheimen Schlüssels und einen öffentlichen Anteil des Verifizierungsschlüssels. 

Danach können beliebige t-von-n Teilnehmer ein *Threshold-Signing-Protokoll* ausführen, um gemeinsam eine gültige Schnorr-Signatur zu erzeugen. 

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

**Distributed Key Generation (DKG)**

Das Ziel dieser Phase ist es, langlebige Anteile geheimer Schlüssel und einen gemeinsamen Verifizierungsschlüssel zu erzeugen. Diese Phase wird von n Teilnehmern ausgeführt. 

FROST baut seine eigene Schlüsselerzeugungsphase auf [Pedersens DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/) auf, wobei sowohl Shamirs Secret Sharing als auch Feldmans verifizierbare Secret-Sharing-Schemata als Unterroutinen verwendet werden. Zusätzlich muss jeder Teilnehmer Kenntnisse über sein eigenes Geheimnis nachweisen, indem er den anderen Teilnehmern einen Zero-Knowledge-Beweis sendet, der selbst eine Schnorr-Signatur ist. Dieser zusätzliche Schritt schützt vor Rogue-Key-Angriffen in einem Setting, in dem t ≥ n/2.

Am Ende des DKG-Protokolls wird ein gemeinsamer Verifizierungsschlüssel vk erzeugt. Außerdem hält jeder Teilnehmer P ᵢ einen Wert (i, sk ᵢ ), der sein langlebiger geheimer Anteil ist, sowie einen Anteil des Verifizierungsschlüssels vk ᵢ = sk ᵢ *G. Der Anteil des Verifizierungsschlüssels vk ᵢ von Teilnehmer P ᵢ wird von anderen Teilnehmern verwendet, um die Korrektheit der Signaturanteile von P ᵢ in der Signierphase zu verifizieren, während der Verifizierungsschlüssel vk von externen Parteien verwendet wird, um von der Gruppe ausgestellte Signaturen zu verifizieren.

**Threshold Signing**

Diese Phase baut auf bekannten Techniken auf, die additives Secret Sharing und Share Conversion verwenden, um die Nonce für jede Signatur nicht-interaktiv zu erzeugen. Diese Phase nutzt außerdem Binding-Techniken, um bekannte Fälschungsangriffe zu vermeiden, ohne die Parallelität einzuschränken.

Vorverarbeitung: In der Vorverarbeitungsphase bereitet jeder Teilnehmer eine feste Anzahl von Punktpaaren auf der Elliptic Curve (EC) für die weitere Verwendung vor; dies wird einmalig für mehrere Threshold-Signing-Phasen ausgeführt.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Signierrunde 1: Jeder Teilnehmer Pᵢ beginnt damit, ein einzelnes privates Nonce-Paar (dᵢ, eᵢ) und das entsprechende Paar von EC-Punkten (Dᵢ, Eᵢ) zu erzeugen, und sendet dieses Punktpaar an alle anderen Teilnehmer. Jeder Teilnehmer speichert diese empfangenen EC-Paare zur späteren Verwendung. Die Signierrunden 2 und 3 sind die eigentlichen Operationen, in denen t-von-n Teilnehmer zusammenarbeiten, um eine gültige Schnorr-Signatur zu erzeugen.

Signierrunde 2: Um eine gültige Schnorr-Signatur zu erzeugen, arbeiten beliebige t Teilnehmer zusammen, um diese Runde auszuführen. Die Kerntechnik hinter dieser Runde ist t-von-t additives Secret Sharing.

Dieser Schritt verhindert Fälschungsangriffe, weil Angreifer Signaturanteile nicht über verschiedene Signiervorgänge hinweg kombinieren oder die Menge der Unterzeichner bzw. die veröffentlichten Punkte für jeden Unterzeichner permutieren können. 

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Nachdem die Challenge c berechnet wurde, ist jeder Teilnehmer in der Lage, die Antwort zᵢ auf die Challenge unter Verwendung der einmaligen Nonces und der langfristigen geheimen Anteile zu berechnen, die t-von-n (Grad t-1) Shamir-Secret-Shares des langlebigen Gruppenschlüssels sind. Am Ende der Signierrunde 2 sendet jeder Teilnehmer zᵢ an die anderen Teilnehmer.

[Das vollständige Paper lesen](https://eprint.iacr.org/2020/852.pdf)


## Bringt es Vorteile für Zcash?

Absolut ja. Die Einführung von FROST in Zcash wird es mehreren geografisch getrennten Parteien ermöglichen, die Ausgabeberechtigung von abgeschirmtem ZEC zu kontrollieren. Ein Vorteil ist, dass mit diesem Signaturschema übertragene Transaktionen von anderen Transaktionen im Netzwerk nicht zu unterscheiden sein werden, wodurch ein starker Schutz gegen Zahlungsnachverfolgung erhalten bleibt und die Menge an Blockchain-Daten, die für Analysen verfügbar ist, begrenzt wird. 

In der Praxis ermöglicht dies den Aufbau einer ganzen Reihe neuer Anwendungen im Netzwerk, von Treuhanddienstleistern bis hin zu anderen nicht-verwahrenden Diensten. 

FROST wird außerdem zu einem wesentlichen Bestandteil bei der sicheren Ausgabe und Verwaltung von Zcash Shielded Assets (ZSA), indem es eine sicherere Verwaltung der Ausgabeberechtigung innerhalb von Entwicklungsorganisationen und ZEC-Verwahrern wie Börsen ermöglicht, indem Vertrauen weiter verteilt wird, während diese Fähigkeit auch Zcash-Nutzern bereitgestellt wird. 


## FROST-Nutzung im breiteren Ökosystem

**FROST in [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Um die Effizienz der Coinbase-Threshold-Signing-Systeme zu verbessern, entwickelten sie eine Version von FROST. Die Coinbase-Implementierung nimmt leichte Änderungen gegenüber dem ursprünglichen FROST-Entwurf vor.

Sie entschieden sich dagegen, die Rolle des Signatur-Aggregators zu verwenden. Stattdessen ist jeder Teilnehmer ein Signatur-Aggregator. Dieses Design ist sicherer: Alle Teilnehmer des Protokolls verifizieren, was andere berechnet haben, um ein höheres Sicherheitsniveau zu erreichen und das Risiko zu verringern. Die (einmalige) Vorverarbeitungsphase wurde ebenfalls entfernt, um die Implementierung zu beschleunigen, stattdessen gibt es eine dritte Signierrunde.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) von Blockstream** 

Eine anwendungsspezifische Verbesserung von FROST, vorgeschlagen zur Nutzung auf der [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) für Bitcoin.

„ROAST ist ein einfacher Wrapper um Schwellenwert-Signaturschemata wie FROST. Es garantiert, dass ein Quorum ehrlicher Unterzeichner, z. B. die Liquid-Funktionäre, auch in Anwesenheit störender Unterzeichner immer eine gültige Signatur erhalten kann, selbst wenn Netzwerkverbindungen beliebig hohe Latenz haben.“ 

___

**FROST in der IETF**

Die Internet Engineering Task Force, gegründet 1986, ist die führende Standardisierungsorganisation für das Internet. Die IETF erstellt freiwillige Standards, die häufig von Internetnutzern, Netzbetreibern und Geräteherstellern übernommen werden, und trägt so dazu bei, den Entwicklungsverlauf des Internets zu prägen.

FROST Version 11 (Variante mit zwei Runden) wurde [bei der IRTF eingereicht](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). 

Dies ist ein wichtiger Schritt für die vollständige Bewertung von FROST als neuer Standard für Schwellenwert-Signaturschemata zur Nutzung im gesamten Internet, in Hardware-Geräten und für andere Dienste in den kommenden Jahren. 
___


Weiterführendes Lernen:

[Coinbase-Artikel - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Erklärung & Beispiel](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Kurzes Video über digitale Schnorr-Signaturen](https://youtu.be/r9hJiDrtukI?t=19)

___
___
