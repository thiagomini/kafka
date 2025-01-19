import type { ProducerBatch, RecordMetadata, TopicMessages } from "kafkajs";
import type { IProducerGateway } from "./producer-gateway.interface.ts";
import assert from "node:assert";

export class ProducerGatewaySpy implements IProducerGateway {
  private isConnected = false;
  private readonly batchesSent: ProducerBatch[] = [];
  private offset = 0;

  async connect(): Promise<void> {
    this.isConnected = true;
  }
  async disconnect(): Promise<void> {
    this.isConnected = false;
  }
  async sendBatch(batch: ProducerBatch): Promise<RecordMetadata[]> {
    this.batchesSent.push(batch);

    return (
      batch.topicMessages?.map((message) => ({
        topicName: message.topic,
        partition: 0,
        timestamp: new Date().toISOString(),
        errorCode: 0,
        offset: String(this.offset++),
      })) ?? []
    );
  }

  shouldBeConnected() {
    assert.ok(this.isConnected, "Producer should be connected");
  }

  shouldBeDisconnected() {
    assert.ok(!this.isConnected, "Producer should be disconnected");
  }

  shouldHaveSentNumberOfBatches(expected: number) {
    assert.strictEqual(
      this.batchesSent.length,
      expected,
      `Producer should have sent ${expected} batches`,
    );

    return this;
  }

  withMessages(messages: TopicMessages[]) {
    assert.deepStrictEqual(messages, this.batchesSent.at(-1)?.topicMessages);

    return this;
  }
}
