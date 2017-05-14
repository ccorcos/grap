import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css } from 'glamor'
import { BlockRecord } from "./Block"
import App from "./App"
import World from "./World"
import uuid from 'uuid/v4'

const style = css({
  color: 'blue'
})

async function main() {
  const records = await BlockRecord.load()
  if (records.length === 0) {
    records.push(
      BlockRecord.create({
        id: uuid(),
        down: false,
        delta: {x: 0, y: 0},
        start: null,
        end: null,
      })
    )
    records.push(
      BlockRecord.create({
        id: uuid(),
        down: false,
        delta: {x: 100, y: 0},
        start: null,
        end: null,
      })
    )
  }
  World.BlockRegistry.set(records)

  const root = document.createElement('div')
  document.body.appendChild(root)

  ReactDOM.render(<App/>, root)

}

main()
