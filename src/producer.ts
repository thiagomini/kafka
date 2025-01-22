import { randomUUID } from "crypto";
import { type Message, type ProducerBatch, type TopicMessages } from "kafkajs";
import type { IProducerGateway } from "./producer-gateway.interface.ts";

export type CustomMessageFormat = {
  a: string;
};

export type KeyProvider = (message: CustomMessageFormat) => string;

export class producer {
  private readonly producerGateway: IProducerGateway;
  private readonly keyProvider: KeyProvider;

  constructor(
    producerGateway: IProducerGateway,
    keyProvider: KeyProvider = () => randomUUID(),
  ) {
    this.producerGateway = producerGateway;
    this.keyProvider = keyProvider;
  }

  public async start(): Promise<void> {
    try {
      await this.producerGateway.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producerGateway.disconnect();
  }

  public async sendBatch(messages: Array<CustomMessageFormat>): Promise<void> {
    const kafkaMessages: Array<Message> = messages.map((message) => {
      return {
        key: this.keyProvider(message),
        value: JSON.stringify(message),
      };
    });

    const topicMessages: TopicMessages = {
      topic: "example",
      messages: kafkaMessages,
    };

    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
    };

    await this.producerGateway.sendBatch(batch);
  }
}
