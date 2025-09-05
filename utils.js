// utils.js
import crypto from "crypto";

/** Deterministische JSON-Serialisierung (alphabetisch sortierte Keys) */
export function serializeDeterministic(obj) {
  const allKeys = [];
  JSON.stringify(obj, (k, v) => (allKeys.push(k), v));
  allKeys.sort();
  return JSON.stringify(obj, allKeys);
}

/** Hex-String eines SHA-256 */
export function sha256Hex(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/** "Adresse" = sha256(pubKeyHex).slice(0, 40) (vereinfachtes Schema) */
export function deriveAddressFromPub(pubKeyHex) {
  return sha256Hex(pubKeyHex).slice(0, 40);
}