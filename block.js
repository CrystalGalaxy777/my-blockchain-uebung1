// block.js
import { sha256Hex, serializeDeterministic } from "./utils.js";

export class Block {
  constructor({ index, prevHash, timestamp, txs, nonce = 0 }) {
    this.index = index;
    this.prevHash = prevHash;
    this.timestamp = timestamp ?? Date.now();
    this.txs = txs ?? [];
    this.nonce = nonce;

    // txRoot = vereinfachter Hash aller tx.hash()
    this.txRoot = this.computeTxRoot();
    this.hash = this.computeHeaderHash(); // Hash nur über Header
  }

  computeTxRoot() {
    const all = this.txs.map((t) => t.hash()).join("|");
    return sha256Hex(all);
  }

  header() {
    return {
      index: this.index,
      prevHash: this.prevHash,
      timestamp: this.timestamp,
      txRoot: this.txRoot,
      nonce: this.nonce,
    };
  }

  computeHeaderHash() {
    return sha256Hex(serializeDeterministic(this.header()));
  }
}