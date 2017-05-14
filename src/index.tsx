import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { css } from 'glamor'
import { BlockRecord } from "./Block"
import App from "./App"
import World from "./World"
import uuid from 'uuid/v4'

css.global("html, body", {
  padding: 0,
  margin: 0,
  boxSizing: "border-box",
})

async function main() {
  const records = await BlockRecord.load()
  if (records.length === 0) {
    records.push(
      BlockRecord.create({
        id: uuid(),
        height: 50,
        width: 50,
        origin: {x: 0, y: 0},
      })
    )
    records.push(
      BlockRecord.create({
        id: uuid(),
        height: 50,
        width: 50,
        origin: {x: 100, y: 0},
      })
    )
  }

  const root = document.createElement('div')
  document.body.appendChild(root)

  ReactDOM.render(<App/>, root)

}

main()
