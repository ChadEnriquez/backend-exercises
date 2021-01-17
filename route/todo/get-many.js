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
     * @param {import('fastify').FastifyRequest} request
     */
    app.get("/todo", (request) => {
        const { query } = request
        const { limit = 3, startDate } = query 
        const filename = join(__dirname, "../../database.json")
        const encoding = "utf8"
        const todos = getTodos(filename, encoding)
        const data = []

        //sorts todos
        //ascending order
        if (!startDate) {
            //descending order
            todos.sort((prev, next) => next.dateUp - prev.dateUp)
        } else {
            //ascending order
            todos.sort((prev, next) => prev.dateUp - next.dateUp)
        }
        for ( const todo of todos ) {
            // no startDate
            // todoUpdated is within startDate
            if (!startDate || startDate <= todo.dateUp) {
                //length below limit
                if (data.length < limit) {
                    data.push(todo)
                }
            } 
        }

        //descending order sort
        data.sort ((prev, next) => next.dateUp - prev.dateUp)

        return {
            success: true,
            data
        }
    })
}