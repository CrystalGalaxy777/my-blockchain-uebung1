// transaction.js
import { serializeDeterministic, sha256Hex } from "./utils.js";
import elliptic from "elliptic";   // правильный импорт в ES Module

const EC = elliptic.ec;
const ec = new EC("secp256k1");


export class Transaction {
  constructor({ from, to, amount, nonce, pubKey }) {
    this.from = from; // Absender-Adresse
    this.to = to; // Empfänger-Adresse
    this.amount = amount; // Zahl
    this.nonce = nonce; // Ganzzahl
    this.pubKey = pubKey; // hex (komprimierter öffentlicher Schlüssel)
    this.sig = null; // Signatur als { r, s } Hex
  }

  /** Deterministische Serialisierung der signierbaren Felder */
  messageToSign() {
    // TODO: ggf. erweitern, aber sig darf NICHT enthalten sein
    return serializeDeterministic({
      from: this.from,
      to: this.to,
      amount: this.amount,
      nonce: this.nonce,
      pubKey: this.pubKey,
    });
  }

  /** Hash der Transaktion (über signierbare Felder) */
  hash() {
    return sha256Hex(this.messageToSign());
  }

  /** Mit privatem Key signieren */
  sign(privateKeyHex) {
    const key = ec.keyFromPrivate(privateKeyHex, "hex");
    const h = this.hash();
    const { r, s } = key.sign(h);
    this.sig = { r: r.toString("hex"), s: s.toString("hex") };
  }

  /** Signatur prüfen */
  isSignatureValid() {
    if (!this.sig) return false;
    try {
      const key = ec.keyFromPublic(this.pubKey, "hex");
      return key.verify(this.hash(), this.sig);
    } catch {
      return false;
    }
  }
}

/** Helfer: Keypair generieren (privat & öffentlicher Schlüssel, Adresse) */
export function generateKeyPair() {
  const key = ec.genKeyPair();
  const privateKey = key.getPrivate("hex");
  const pubKey = key.getPublic(true, "hex"); // komprimiert
  return { privateKey, pubKey };
}