import { Value, DerivedValue } from "reactive-magic"

// Primatives
export class NumberInput extends Value<number> {}
export class StringInput extends Value<string> {}
export class NumberOutput extends DerivedValue<number> {}
export class StringOutput extends DerivedValue<string> {}

export abstract class FunctionBlock<Input, Output> {
	abstract input: Value<Input>
	abstract output: Output
}

export abstract class DataBlock<Input> {
	abstract input: Value<Input>
}
