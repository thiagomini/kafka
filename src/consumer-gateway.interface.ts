import type { ConsumerRunConfig } from "kafkajs";

export interface IConsumerGateway {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  subscribe(topic: string): Promise<void>;
  run(callback: ConsumerRunConfig): Promise<void>;
}
