const { getTodos } = require("../../lib/get-todos")
const { join } = require("path")

/**
 * Gets one todos
 * 
 * @param {*} app 
 */
exports.get = app => {
    /**
     * Gets one todo from database
     * give unique ID
     * @param {import('fastify').FastifyRequest} request
     */
    // "/todo/:id"
    app.get("/todo/:id", (request) => {
        const { params } = request
        const { id } = params
        const filename = join(__dirname, "../../database.json")
        const encoding = "utf8"
        const todos = getTodos(filename, encoding)

        const index = todos.findIndex(todo => todo.id === id)
        const data = todos[index]

        return {
            success: true,
            data
        }
    })
}