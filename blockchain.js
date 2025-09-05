// blockchain.js
import { Block } from "./block.js";

export class Blockchain {
  constructor() {
    this.chain = [];
    this.createGenesis();
  }

  createGenesis() {
    // TODO (leicht): Passe timestamp/nonce nach Wunsch an
    const genesis = new Block({
      index: 0,
      prevHash: "0".repeat(64),
      timestamp: Date.now(),
      txs: [],
      nonce: 0,
    });
    this.chain.push(genesis);
  }

  get latest() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(txs) {
    const block = new Block({
      index: this.latest.index + 1,
      prevHash: this.latest.hash,
      timestamp: Date.now(),
      txs,
      nonce: 0,
    });
    this.chain.push(block);
    return block;
  }

  /** Kettenvalidierung: prevHash-Verkettung, txRoot stimmt, Header-Hash stimmt */
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const prev = this.chain[i - 1];
      const curr = this.chain[i];

      // prevHash korrekt?
      if (curr.prevHash !== prev.hash) return false;

      // txRoot stimmt?
      if (curr.txRoot !== curr.computeTxRoot()) return false;

      // Header-Hash stimmt?
      if (curr.hash !== curr.computeHeaderHash()) return false;
    }
    return true;
  }
}