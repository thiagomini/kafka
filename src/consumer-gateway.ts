import { Kafka, type Consumer, type ConsumerRunConfig } from "kafkajs";
import type { IConsumerGateway } from "./consumer-gateway.interface.ts";

export class ConsumerGateway implements IConsumerGateway {
  private readonly consumer: Consumer;

  constructor() {
    this.consumer = this.createconsumer();
  }

  private createconsumer(): Consumer {
    const kafka = new Kafka({
      clientId: "consumer-client",
      brokers: ["localhost:9092"],
    });

    return kafka.consumer({
      groupId: "CG-01",
    });
  }

  async connect(): Promise<void> {
    await this.consumer.connect();
  }
  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }
  async subscribe(topic: string): Promise<void> {
    await this.consumer.subscribe({
      topic,
      fromBeginning: true,
    });
  }

  async run(consumerConfig: ConsumerRunConfig): Promise<void> {
    await this.consumer.run(consumerConfig);
  }
}
