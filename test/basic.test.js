// test/basic.test.js
// EN: Minimal tests for our exercise repo (ESM)
// DE: Minimale Tests für unser Übungsrepo (ESM)
// RU: Минимальные тесты для учебного репо (ESM)

import assert from "assert";
import { serializeTx, sha256 } from "../transaction.module.js";

// ---------- Fixture / Testdaten / Тестовые данные ----------
const tx = { from: "a", to: "b", amount: 10, nonce: 1 };

// ---------- Test 1: serializeTx is deterministic ----------
// EN: Field order must be fixed so signatures are reproducible
// DE: Feste Feldreihenfolge, damit Signaturen reproduzierbar sind
// RU: Фиксированный порядок полей, чтобы подпись была воспроизводимой
const ser = serializeTx(tx);
assert.strictEqual(
  ser,
  JSON.stringify({ from: "a", to: "b", amount: 10, nonce: 1 }),
  "serializeTx() must produce deterministic JSON"
);

// ---------- Test 2: sha256 length = 64 hex ----------
// EN: Hash text length check
// DE: Prüfen der Hash-Länge
// RU: Проверяем длину хэша (64 hex-символа)
const h = sha256("test");
assert.strictEqual(h.length, 64, "sha256() must return 64 hex chars");

// ---------- Test 3: serializeTx ignores extra fields ----------
// EN: Extra props must not break determinism
// DE: Zusätzliche Felder dürfen Determinismus nicht brechen
// RU: Лишние поля не должны нарушать детерминизм
const txWithExtra = { ...tx, foo: 123, bar: "x" };
assert.strictEqual(
  serializeTx(txWithExtra),
  ser,
  "serializeTx() must ignore non-specified fields"
);

console.log("✅ All basic tests passed");
