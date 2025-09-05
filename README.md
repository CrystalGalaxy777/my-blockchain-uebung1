````markdown
# Übung: Von der Transaktion zur Blockchain  

Dieses Projekt ist eine Übungsaufgabe im Rahmen des Blockchain-Kurses.  
Ziel: **Von der Transaktion → über Mempool → in einen Block → zur Blockchain**.  

---

## 📌 Schritte

1. **Transaktion erzeugen**
   - Schlüsselpaar generieren  
   - Absenderadresse ableiten  
   - Transaktion mit Betrag `10` erstellen  
   - Transaktion signieren und überprüfen  

2. **Mempool**
   - Signierte Transaktion in den Mempool einfügen  
   - Manipulierte Transaktion (geänderter Betrag) wird abgelehnt  

3. **Block**
   - Genesis-Block erstellen  
   - Neuen Block mit der Transaktion aus dem Mempool hinzufügen  
   - `prevHash` prüfen  

4. **Blockchain**
   - Blockchain-Instanz erzeugen  
   - Block hinzufügen  
   - `isValid()` aufrufen und Ergebnis ausgeben  

---

## ▶️ Ausführung

Im Projektordner:

```bash
npm install
npm start
````

---

## 💡 Erwartete Konsolenausgaben

```
Transaktion signiert und gültig.
Manipulierte Transaktion ungültig!
Genesis-Block erstellt.
Neuer Block hinzugefügt.
prevHash korrekt gesetzt? true
Blockchain valid: true
```

*(Zusatz-Minicheck: Wenn man einen Block-Header verändert, liefert `isValid()` → `false`.)*

---

## 📂 Projektstruktur

```
my-blockchain-uebung1/
│── package.json
│── utils.js
│── transaction.js
│── mempool.js
│── block.js
│── blockchain.js
│── testBlockchain.js
│── README.md
```