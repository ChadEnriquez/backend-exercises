const { getTodos } = require("../../lib/get-todos")
const { delay } = require("../../lib/delay")
const { writeFileSync } = require("fs")
const { join } = require("path")
const { build } = require("../../app")
const should = require("should")
require("tap").mochaGlobals()

describe("For the route for updating one todos PUT: (/todo/:id)", () => {
  let app
  const ids = []
  const filename = join(__dirname, "../../database.json")
  const encoding = "utf8"

  before(async () => {
      const payloads =[{
          text: "this is a todo",
          done: false
      }]
      app = await build()
      for (let i = 0; i < 4; i++) {
          const response = await app.inject({
              method: "POST",
              url: "/todo",
              payload: {
                  text: `todo ${i}`,
                  done: false
              }
          })
          const payload = response.json()
          const {  data } = payload
          const { id } = data
          ids.push(id)
          await delay(1000)

      }
  })

  after(async () => {
      //clean database
      const todos = getTodos(filename, encoding)
      for (const id of ids) {
          const index = todos.findIndex(todo => todo.id === id)
          //delete id
          if (index >= 0){
              todos.splice(index, 1)
          }
          writeFileSync(filename, JSON.stringify({ todos }, null, 2), encoding)
      }
  })
// happy path
  it("It should return { success:true, data: todo } and statusCode of 200 when called using PUT and updates item", async () => {
      const response = await app.inject({
          method: "PUT",
          url: `/todo/${ids[0]}`,
          payload: {
              text: "New Todo",
              done: true
          }
      })
      const payload = response.json()
      const { statusCode } = response
      const { success, data } = payload
      const { text, id, done } = data
      success.should.equal(true)
      statusCode.should.equal(200)

      const todos = getTodos(filename, encoding)
      const index = todos.findIndex(todo => todo.id === id)
      const todo = todos[index]

      text.should.equal("New Todo")
      done.should.equal(true)
      text.should.equal(todo.text)
      done.should.equal(todo.done)
      id.should.equal(todo.id)
      
  })

  it("It should return { success:true, data: todo } and statusCode of 200 when called using PUT and updates text item", async () => {
    const response = await app.inject({
        method: "PUT",
        url: `/todo/${ids[1]}`,
        payload: {
            text: "New Todo 1",
        }
    })
    const payload = response.json()
    const { statusCode } = response
    const { success, data } = payload
    const { text, id, done } = data
    success.should.equal(true)
    statusCode.should.equal(200)

    const todos = getTodos(filename, encoding)
    const index = todos.findIndex(todo => todo.id === id)
    const todo = todos[index]

    text.should.equal("New Todo 1")
    done.should.equal(false)
    text.should.equal(todo.text)
    done.should.equal(todo.done)
    id.should.equal(todo.id)
    
})

it("It should return { success:true, data: todo } and statusCode of 200 when called using PUT and updates done item", async () => {
    const response = await app.inject({
        method: "PUT",
        url: `/todo/${ids[2]}`,
        payload: {
            done: true
        }
    })
    const payload = response.json()
    const { statusCode } = response
    const { success, data } = payload
    const { text, id, done } = data
    success.should.equal(true)
    statusCode.should.equal(200)

    const todos = getTodos(filename, encoding)
    const index = todos.findIndex(todo => todo.id === id)
    const todo = todos[index]

    done.should.equal(true)
    text.should.equal(todo.text)
    done.should.equal(todo.done)
    id.should.equal(todo.id)
    
})
//   unhappy path
    it("It should return { success:false, message: error message } and statusCode of 404 when called using PUT and id of todo is non-existent", async () => {
        const response = await app.inject({
            method: "PUT",
            url: `/todo/non-existing-id`,
            payload: {
                text: "New Todo",
                done: true
            }
        })
        const payload = response.json()
        const { statusCode } = response
        const { success, code, message } = payload
        success.should.equal(false)
        statusCode.should.equal(404)

        should.exists(code)
        should.exists(message)
        })
// unhappy path
    it("It should return { success:false, message: error message } and statusCode of 404 when called using PUT and no payload", async () => {
        const response = await app.inject({
            method: "PUT",
            url: `/todo/${ids[3]}`,
        })
        const payload = response.json()
        const { statusCode } = response
        const { success, code, message } = payload
        success.should.equal(false)
        statusCode.should.equal(400)
    
        should.exists(code)
        should.exists(message)
    })
    it("It should return { success:false, message: error message } and statusCode of 404 when called using PUT and payload w/o txt or done", async () => {
        const response = await app.inject({
            method: "PUT",
            url: `/todo/${ids[3]}`,
            payload: {}
        })
        const payload = response.json()
        const { statusCode } = response
        const { success, code, message } = payload
        success.should.equal(false)
        statusCode.should.equal(400)
    
        should.exists(code)
        should.exists(message)
    })
})

