import type { ProducerBatch, RecordMetadata } from "kafkajs";

export interface IProducerGateway {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  sendBatch(batch: ProducerBatch): Promise<RecordMetadata[]>;
}
