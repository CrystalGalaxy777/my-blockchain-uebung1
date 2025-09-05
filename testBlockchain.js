// testBlockchain.js
import { generateKeyPair, Transaction } from "./transaction.js";
import { deriveAddressFromPub } from "./utils.js";
import { Mempool } from "./mempool.js";
import { Blockchain } from "./blockchain.js";

// 1) Transaktion erzeugen
console.log("== Schritt 1: Transaktion erzeugen ==");

const sender = generateKeyPair();
const receiver = generateKeyPair(); // zweite Adresse
const fromAddress = deriveAddressFromPub(sender.pubKey);
const toAddress = deriveAddressFromPub(receiver.pubKey);

const tx = new Transaction({
  from: fromAddress,
  to: toAddress,
  amount: 10, // TODO: ändere den Betrag und beobachte Auswirkungen
  nonce: 0, // TODO: probiere 1 oder 2 und teste Duplicate-Logik später
  pubKey: sender.pubKey,
});

// Signieren
tx.sign(sender.privateKey);

if (tx.isSignatureValid()) {
  console.log("Transaktion signiert und gültig.");
} else {
  console.log("❌ Signatur ungültig (sollte gültig sein).");
}

// 2) Mempool & Manipulationstest
console.log("\n== Schritt 2: Mempool & Manipulation ==");

const mempool = new Mempool();
let res = mempool.add(tx);
console.log(
  res.ok ? "Transaktion in Mempool aufgenommen." : `Abgelehnt: ${res.reason}`
);

// Manipulationstest: Betrag ändern -> Signatur muss ungültig werden
const hacked = new Transaction({
  from: tx.from,
  to: tx.to,
  amount: 9999, // Manipulation
  nonce: tx.nonce,
  pubKey: tx.pubKey,
});
hacked.sig = tx.sig; // kopieren, aber Daten anders => sollte ungültig
const resHack = mempool.add(hacked);
console.log(
  resHack.ok
    ? "❌ Manipulierte Transaktion wurde fälschlich akzeptiert!"
    : "Manipulierte Transaktion ungültig!"
);

// 3) Block erzeugen
console.log("\n== Schritt 3: Block erzeugen ==");

const bc = new Blockchain();
console.log("Genesis-Block erstellt.");

const pending = mempool.takeAll();
const newBlock = bc.addBlock(pending);
console.log("Neuer Block hinzugefügt.");
console.log(
  "prevHash korrekt gesetzt?",
  newBlock.prevHash === bc.chain[bc.chain.length - 2].hash
);

// 4) Kette prüfen
console.log("\n== Schritt 4: Blockchain prüfen ==");
console.log("Blockchain valid:", bc.isValid());

// ✅ Zusatz-Minicheck: Korrumpiere einen Block-Header und prüfe erneut
// TODO (optional leicht): Entkommentieren und sehen, dass isValid() false wird
// newBlock.timestamp = 42;
// console.log("Blockchain valid nach Manipulation:", bc.isValid());