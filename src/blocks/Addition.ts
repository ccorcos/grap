import { Value } from "reactive-magic"
import { NumberInput, NumberOutput, FunctionBlock } from "./core"

interface AdditionInput {
	x: NumberInput | NumberOutput
	y: NumberInput | NumberOutput
}

interface AdditionOutput {
	sum: NumberOutput
}

export default class AdditionBlock extends FunctionBlock<
	AdditionInput,
	AdditionOutput
> {
	input = new Value({
		x: new NumberInput(0),
		y: new NumberInput(0),
	})
	output = {
		sum: new NumberOutput(() => {
			const { x, y } = this.input.get()
			return x.get() + y.get()
		}),
	}
}
