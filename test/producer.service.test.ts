import test, { describe } from "node:test";
import { ProducerGatewaySpy } from "../src/producer-gateway.spy.ts";
import {
  producer,
  type CustomMessageFormat,
  type KeyProvider,
} from "../src/producer.ts";

describe("ProducerService", () => {
  test("should send serialized messages to the 'example' topic", async () => {
    const producerGatewaySpy = new ProducerGatewaySpy();
    const keyProvider: KeyProvider = () => "test-key";
    const producerService = new producer(producerGatewaySpy, keyProvider);
    await producerService.start();
    const message: CustomMessageFormat = { a: "test" };

    await producerService.sendBatch([message]);

    producerGatewaySpy.shouldBeConnected();
    producerGatewaySpy.shouldHaveSentNumberOfBatches(1).withMessages([
      {
        messages: [
          {
            value: '{"a":"test"}',
            key: "test-key",
          },
        ],
        topic: "example",
      },
    ]);
  });
});
