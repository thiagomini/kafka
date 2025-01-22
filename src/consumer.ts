import type { ConsumerRunConfig, Message } from "kafkajs";
import type { IConsumerGateway } from "./consumer-gateway.interface.ts";

export type MessageHandler = ({
  message,
}: {
  message: Message;
}) => Promise<void>;

export class Consumer {
  private readonly consumerGateway: IConsumerGateway;

  constructor(consumerGateway: IConsumerGateway) {
    this.consumerGateway = consumerGateway;
  }

  public async start(): Promise<void> {
    try {
      await this.consumerGateway.connect();
    } catch (error) {
      console.log("Error connecting the consumer: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.consumerGateway.disconnect();
  }

  public async subscribe(topic: string): Promise<void> {
    await this.consumerGateway.subscribe(topic);
  }

  public async run(messageHandler: MessageHandler): Promise<void> {
    const wrappedCallBack = async ({ message }: { message: Message }) => {
      try {
        await messageHandler({ message });
      } catch (error) {
        console.log("Error processing message: ", error);
      }
    };

    const callback: ConsumerRunConfig = {
      eachMessage: wrappedCallBack,
    };

    await this.consumerGateway.run({
      eachMessage: wrappedCallBack,
      autoCommit: true,
    });
  }
}
