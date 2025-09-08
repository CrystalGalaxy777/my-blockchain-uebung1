// testNonce.js – Experiment zu Nonce und Duplikaten

import { generateKeyPair, Transaction } from "./transaction.js";
import { deriveAddressFromPub } from "./utils.js";
import { Mempool } from "./mempool.js";

console.log("\n== Nonce-Experiment ==");

// 1) Schlüsselpaare
const sender = generateKeyPair();
const receiver = generateKeyPair();

// 2) Adressen ableiten
const fromAddress = deriveAddressFromPub(sender.pubKey);
const toAddress = deriveAddressFromPub(receiver.pubKey);

// 3) Erste Transaktion (nonce = 1)
const tx1 = new Transaction({
  from: fromAddress,
  to: toAddress,
  amount: 10,
  nonce: 1, // Nonce bewusst auf 1 gesetzt
  pubKey: sender.pubKey,
});
tx1.sign(sender.privateKey);

// 4) Zweite Transaktion (gleicher nonce = 1)
const tx2 = new Transaction({
  from: fromAddress,
  to: toAddress,
  amount: 20,
  nonce: 1, // auch 1 → Duplikat
  pubKey: sender.pubKey,
});
tx2.sign(sender.privateKey);

// 5) In den Mempool einfügen
const mempool = new Mempool();

console.log("→ Erste TX hinzufügen:");
console.log(mempool.add(tx1)); // { ok: true }

console.log("→ Zweite TX mit gleichem Nonce hinzufügen:");
console.log(mempool.add(tx2)); // { ok: false, reason: 'Duplicate (from, nonce)' }
