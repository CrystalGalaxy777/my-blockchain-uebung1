// mempool.js
import { deriveAddressFromPub } from "./utils.js";

export class Mempool {
  constructor() {
    this.pool = []; // einfache Liste
    // Wir tracken (from, nonce), um Duplikate zu verhindern
    this.seen = new Set();
  }

  /** Validierung: Signatur, pubKey->from, keine Duplicate (from, nonce) */
  validate(tx) {
    // Signatur gültig?
    if (!tx.isSignatureValid())
      return { ok: false, reason: "Invalid signature" };

    // Passt Absenderadresse zu pubKey?
    const shouldFrom = deriveAddressFromPub(tx.pubKey);
    if (tx.from !== shouldFrom)
      return { ok: false, reason: "From does not match pubKey" };

    // Duplicate (from, nonce)?
    const key = `${tx.from}:${tx.nonce}`;
    if (this.seen.has(key))
      return { ok: false, reason: "Duplicate (from, nonce)" };

    return { ok: true };
  }

  add(tx) {
    const v = this.validate(tx);
    if (!v.ok) return v;

    this.pool.push(tx);
    this.seen.add(`${tx.from}:${tx.nonce}`);
    return { ok: true };
  }

  takeAll() {
    const all = this.pool.slice();
    this.pool = [];
    this.seen.clear();
    return all;
  }
}