export default 1

/*

considerations
- collaborative editing and version control
- type checking at runtime or typescript
  - sourcemap errors
- blocks can functions or data structures
  - functions and data structures are the same thing because functions construct data structures.
- no constraint solving for now, just one-way data flow

examples
- CSG editor
- Synthethizer
- Application Storyboard
- Contacts Application / Brain Web?!!

todo
- build a graph editor
	- block definitions
		- function block and data block
		- ui fields, async fields
		- state machines


  - connect lines between blocks
    - Block types and Block fields
    - EdgeRegistry and EdgeStorage
    - Port types
    - Block types
    - how can we build languages, interact with code, compile and run, etc.
    - better edge paths
      - dynamic rigidity
      - control point up and down if delta.y is close to 0
  - group blocks to create recursive drawings
  - copy paste blocks

- persist everything immutably
- make it do some simple math

- later
  - hold cmd to snap to grid
  - control block layer height
  - zoom to fit
  - zoom / scroll boundaries
  - block dragging autoscroll
*/

// // lets think generally about how to create a reactive graph database
// // where a node's fields can swap out for edge to other nodes, etc.

// // A record saves an arbitrary value. Its reactive. Its id an a uuid
// class Record<Type> {
// 	id: string
// 	value: Type
// }

// // A node has a set of records and derived values. A derived value is
// // like a record -- it has an id -- but it's value does not get persisted.
// export class Node {
// 	id: string
// 	origin: Record<number>
// 	x: Record<number>
// 	y: Record<number>
// 	sum: DerivedValue<number>
// }

// // An edge is a record that connects two records
// export class Edge<Type> {
// 	id: string
// 	from: Record<Type> | DerivedValue<Type>
// 	to: Record<Type>
// }

// // Any node records can point to another node record or derived value
// // through an edge.

// export class Node2 {
// 	id: string
// 	origin: Record<number>
// 	x: Record<number> | Edge<number>
// 	y: Record<number> | Edge<number>
// 	sum: DerivedValue<number>
// }

// // When you persist a node or an edge, you persist the ids of its properties

// // A node should have a serialize, deserialize, fetch (all the record ids it needs) and load.

import Storage from "./core/Storage"
import { Value } from "reactive-magic"

const AllStorage = new Storage<any>()

export class Record<Kind> {
	public id: string
	private value: Value<Kind>
	constructor(id: string, value: Kind) {
		this.id = id
		this.value = new Value(value)
	}

	static load(id: string) {
		return new Record(id, AllStorage.get(id))
	}

	get() {
		return this.value.get()
	}

	set(value: Kind) {
		this.value.set(value)
		AllStorage.set(this.id, value)
	}

	delete() {
		AllStorage.remove(this.id)
	}
}

interface Identifiable {
	id: string
}

interface IdentifiableMap {
	[key: string]: Identifiable
}

export class FunctionNode<
	Input extends IdentifiableMap,
	Output extends IdentifiableMap
> {
	public id: string
	public input: Input
	public output: Output
	public layout: IdentifiableMap

	serialize() {
		return {
			id: this.id,
			input: {
				whatever: this.input.whatever.id,
			},
			output: {
				whatever: this.output.whatever.id,
			},
			layout: {
				whatever: this.layout.whatever.id,
			},
		}
	}

	static deserialize(json: any) {
		// Record.load()
	}
}

export class DataNode<Input extends IdentifiableMap> {
	public id: string
	public input: Input
	public layout: IdentifiableMap
}

// export class Node {
// 	id: string
// 	origin: Record<number>
// 	x: Record<number>
// 	y: Record<number>
// 	sum: DerivedValue<number>
// }
