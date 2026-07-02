<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Seite bearbeiten"/>
</a>

# Synchronisierung von Zcash Wallets

### Wie die Zcash-Synchronisierung funktioniert

Um zu verstehen, wie Warp Sync funktioniert, lassen Sie mich etwas mehr über Zcash erklären. Es ist eine auf Privatsphäre ausgerichtete Kryptowährung, die eine Technologie namens Zero-Knowledge-Proofs verwendet, um die Details von Transaktionen vor allen zu verbergen, die nicht berechtigt sind, sie zu sehen. Das bedeutet, dass die auf der Blockchain aufgezeichneten Transaktionen verschlüsselt oder verborgen sind, und nur der Sender und der Empfänger sie mit ihren privaten Schlüsseln entschlüsseln können.

Dies stellt jedoch auch eine Herausforderung für Light Wallets dar, also Anwendungen, die nicht die gesamten Blockchain-Daten auf dem Gerät speichern, sondern sich auf einen Server verlassen, der ihnen die notwendigen Informationen bereitstellt. Bei Coins ohne Datenschutzfunktionen wie Bitcoin oder Ethereum kann der Server die Blockchain leicht indexieren und eine Datenbank für jedes Konto führen. Wenn eine Light Wallet nach ihren spezifischen Kontodaten fragt, kann der Server diese schnell zurückgeben.

Aber bei  Zcash kann der Server das nicht tun, weil er die Details der Transaktionen nicht sehen kann. Wie kann also eine Light Wallet ihren Kontostand und ihre Transaktionshistorie synchronisieren, ohne die gesamten Blockchain-Daten selbst herunterzuladen und zu entschlüsseln?

Zcash löst dieses Problem mit einem gemischten Ansatz. Es gibt einen spezialisierten Server namens lightwalletd, der die Daten eines Full Nodes filtert und nur die für die Transaktionsidentifikation benötigten Daten behält. Diese Daten werden Compact Blocks genannt und sind viel kleiner als die ursprünglichen Blöcke. Light Wallets müssen nur diese Compact Blocks vom lightwalletd-Server herunterladen und sie dann selbst mit ihren privaten Schlüsseln entschlüsseln.

Allerdings kann selbst das Entschlüsseln und Verarbeiten dieser Compact Blocks erhebliche Zeit in Anspruch nehmen, besonders wenn sich in jedem Block viele Transaktionen befinden. Deshalb hat jedes Wallet seine eigene alternative Methode, um den Synchronisierungsprozess zu beschleunigen, damit Sie Ihre Mittel so schnell wie möglich nutzen können.

### Warp Sync
Warp Sync ist eine Funktion von YWallet, die es ermöglicht, die Zwischenschritte des Entschlüsselns und Verarbeitens jedes Compact Blocks zu überspringen und stattdessen direkt zum Endergebnis zu springen.

Dazu nutzt es clevere Mathematik und Kryptographie, um das Endergebnis zu berechnen, ohne jeden einzelnen Schritt durchlaufen zu müssen. 

Warp Sync kann Tausende von Blöcken pro Sekunde verarbeiten, also viel schneller als die übliche Synchronisierungsmethode. Das bedeutet, dass YWallet-Nutzer eine schnelle und reibungslose Leistung genießen können, selbst bei Hunderttausenden von Transaktionen und empfangenen Notes in ihren Konten.

Abgesehen von dieser Technik des **Überspringens von Schritten** ist YWallet auch in der Lage, verschiedene Blöcke gleichzeitig zu verarbeiten und die Last auf die verfügbare Hardware zu verteilen, wodurch der Prozess noch schneller wird.

Lesen Sie mehr über [Warp Sync](https://ywallet.app/warp/)

### Spend-before-sync
Spend-before-sync ist eine neue Funktion, die im Zcash Mobile Wallet SDK V2 implementiert wurde und es Nutzern ermöglicht, Gelder sofort nach dem Öffnen ihres Wallets auszugeben, ohne auf eine vollständige Wallet-Synchronisierung warten zu müssen. Diese Funktion beschleunigt die Ermittlung des ausgabefähigen Wallet-Guthabens und verbessert die Nutzererfahrung.

Spend-before-sync funktioniert mit einem Synchronisierungsalgorithmus für Compact Blocks, der Blöcke vom lightwalletd-Server in nichtlinearer Reihenfolge verarbeitet. Das bedeutet, dass Wallets jetzt etwas mehr Speicher und Rechenleistung nutzen können, um verschiedene Abschnitte der Blockchain zu scannen, anstatt darauf zu warten, dass ein Block verarbeitet wird, bevor zum nächsten übergegangen wird. Üblicherweise scannt es in unterschiedlichen Bereichen und sucht nach neueren Transaktionen, während gleichzeitig ältere Blöcke heruntergeladen und verarbeitet werden. Wenn eine aktuelle, nicht ausgegebene Note entdeckt wird, wird sie sofort verfügbar gemacht.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync
Blaze Sync wurde vom Zecwallet-Team entwickelt und ist ein Synchronisierungsalgorithmus für Light Wallets, der die Blockchain „rückwärts“ scannt, also beim höchsten, neuesten Block beginnt und sich von dort aus zurückarbeitet.

Dadurch kann das Wallet ausgegebene Notes vor empfangenen finden und zugleich die bereits nicht ausgegebenen verfügbar machen, ohne darauf warten zu müssen, dass der vollständige Synchronisierungsprozess abgeschlossen ist.

Außerdem verwendet es Out of Order Sync, indem es „die Komponenten der Synchronisierung voneinander entkoppelt - das Herunterladen von Blöcken, das Durchführen von Trial Decryptions, das Aktualisieren von Witnesses“, und sie parallel verarbeitet. Das benötigt etwas mehr Speicher- und CPU-Ressourcen, erhöht aber die Synchronisierungsgeschwindigkeit um das Fünffache.

### DAGSync

DAGSync ist ein vorgeschlagener Synchronisierungsalgorithmus, der darauf abzielt, die Nutzererfahrung von abgeschirmten Zcash Wallets zu verbessern, indem die Synchronisierung beschleunigt wird.

Er basiert auf [der Idee, einen gerichteten azyklischen Graphen zu verwenden](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) (DAG), um die Abhängigkeiten zwischen Notes, Witnesses und Nullifiers in einem Zcash Wallet darzustellen. 

Ein DAG ist eine Datenstruktur, die aus Knoten und Kanten besteht, wobei jede Kante eine Richtung hat, die eine Beziehung zwischen zwei Knoten angibt. Ein DAG hat keine Zyklen, was bedeutet, dass es keine Möglichkeit gibt, von einem Knoten aus zu starten und den Kanten zurück zu demselben Knoten zu folgen.

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

---

Interessanterweise versuchen all diese Mechanismen, die von Zcash Security in seinem Beitrag über [skalierbares privates Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) und dessen Beziehung zu privaten Zahlungssystemen aufgeworfenen Fragen zu lösen. Einige gehen sogar noch einen Schritt weiter und laden alle Memo-Daten von Servern herunter, mit Ausnahme derjenigen, die ausschließlich zu einer Adresse gehören, wodurch die Privatsphäre auf Kosten eines kleinen zusätzlichen Ressourcenaufwands erhöht wird.

Auch die Zcash Foundation hat sich andere Alternativen angesehen, um die Leistung von Light Wallets zu verbessern. Das ist der Fall bei [Oblivious Message Retrieval (OMR](https://zfnd.org/oblivious-message-retrieval/)), einer Konstruktion, die die Foundation untersucht hat, „um festzustellen, ob sie eine mögliche Lösung für die jüngsten Leistungsprobleme bietet, die Zcash-Wallet-Nutzer betroffen haben“
