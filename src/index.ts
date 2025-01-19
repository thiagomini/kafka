import { ProducerGateway } from "./producer.gateway.ts";
import { ProducerService } from "./producer.service.ts";

const producerService = new ProducerService(new ProducerGateway());

console.log("▶ Starting producer...");
await producerService.start();
console.log("✅ Producer started!");

console.log("▶ Sending batch...");
await producerService.sendBatch([{ a: "message 1" }, { a: "message 2" }]);
console.log("✅ Batch sent!");

console.log("🛑 Shutting down producer...");
await producerService.shutdown();
console.log("✅ Producer shut down!");
