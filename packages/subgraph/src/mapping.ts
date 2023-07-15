import { BigInt } from "@graphprotocol/graph-ts";
import { GreetingChange } from "../generated/YourContract/YourContract";
import { Greeting, Sender } from "../generated/schema";

export function handleSetPurpose(event: GreetingChange): void {
  let senderString = event.params.greetingSetter.toHexString();

  let sender = Sender.load(senderString);

  if (sender === null) {
    sender = new Sender(senderString);
    sender.address = event.params.greetingSetter;
    sender.createdAt = event.block.timestamp;
    sender.greetingCount = BigInt.fromI32(1);
  } else {
    sender.greetingCount = sender.greetingCount.plus(BigInt.fromI32(1));
  }

  let purpose = new Greeting(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );

  purpose.greeting = event.params.newGreeting;
  purpose.sender = senderString;
  purpose.createdAt = event.block.timestamp;
  purpose.transactionHash = event.transaction.hash.toHex();

  purpose.save();
  sender.save();
}
