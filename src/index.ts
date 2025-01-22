import { ConsumerGateway } from "./consumer-gateway.ts";
import { Consumer } from "./consumer.ts";
import { ProducerGateway } from "./producer.gateway.ts";
import { producer } from "./producer.ts";

const producerService = new producer(new ProducerGateway());

console.log("▶ Starting producer...");
await producerService.start();
// console.log("✅ Producer started!");

// console.log("▶ Sending batch...");
// await producerService.sendBatch([{ a: "message 1" }, { a: "message 2" }]);
// console.log("✅ Batch sent!");

// console.log("🛑 Shutting down producer...");
// await producerService.shutdown();
// console.log("✅ Producer shut down!");

const consumerService = new Consumer(new ConsumerGateway());
await consumerService.start();
await consumerService.subscribe("example");
await consumerService.run(async ({ message }) => {
  console.log("Received message: %o", message);
});
