import { Value } from "reactive-magic"
import { NumberInput, DataBlock } from "./core"

interface PointInput {
	x: NumberInput
	y: NumberInput
}

export default class Point2D extends DataBlock<PointInput> {
	input = new Value({
		x: new NumberInput(0),
		y: new NumberInput(0),
	})
}
