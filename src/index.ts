import { ProducerFactory } from "./producer.factory.ts";

const factory = new ProducerFactory();

console.log("▶ Starting producer...");
await factory.start();
console.log("✅ Producer started!");

console.log("▶ Sending batch...");
await factory.sendBatch([{ a: "message 1" }, { a: "message 2" }]);
console.log("✅ Batch sent!");

console.log("🛑 Shutting down producer...");
await factory.shutdown();
console.log("✅ Producer shut down!");
