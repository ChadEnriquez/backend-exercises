const { getTodos } = require("../../lib/get-todos")
const { join } = require("path")

/**
 * Gets many todos
 * 
 * @param {*} app 
 */
exports.getMany = app => {
    /**
     * Gets todos from database
     */
    app.get("/todo", (request) => {
        const filename = join(__dirname, "../../database.json")
        const encoding = "utf8"
        const todos = getTodos(filename, encoding)
        const data = []

        for ( const todo of todos ) {
            data.push(todo)
        }

        return {
            success: true,
            data
        }
    })
}