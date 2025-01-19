import {
  Kafka,
  type Producer,
  type ProducerBatch,
  type RecordMetadata,
} from "kafkajs";
import type { IProducerGateway } from "./producer-gateway.interface.ts";

export class ProducerGateway implements IProducerGateway {
  private readonly producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: "producer-client",
      brokers: ["localhost:9092"],
    });

    return kafka.producer();
  }

  connect(): Promise<void> {
    return this.producer.connect();
  }
  disconnect(): Promise<void> {
    return this.producer.disconnect();
  }
  sendBatch(batch: ProducerBatch): Promise<RecordMetadata[]> {
    return this.producer.sendBatch(batch);
  }
}
