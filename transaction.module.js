// transaction.module.js
// EN: Module wrapper for tests
// DE: Modul-Wrapper für Tests
// RU: Модуль-обёртка для тестов

import crypto from "crypto";

// Original helper functions
export function serializeTx(tx) {
  const ordered = { from: tx.from, to: tx.to, amount: tx.amount, nonce: tx.nonce };
  return JSON.stringify(ordered);
}

export function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// Stub for later (mempool logic is in transaction.js)
export function addToMempool() {
  throw new Error("addToMempool not implemented in module version");
}
