const { v4:uuid } = require("uuid")
const { readFileSync, writeFileSync } = require("fs")
const { join } = require("path")

/**
 * route for creating todos
 * @param {*} app 
 */
exports.create = (app) => {
    // '/'
    app.post("/todo", {
        /**
         * handles request for route
         * @param {import('fastify').FastifyRequest} request 
         * @param {import('fastify').FastifyReply<Response>} response 
         */
        handler: async (request, response) => {
            //creates id or identifier
            const id = uuid()
            const { body } = request
            //gets text and done
            //default is false
            //returns empty object
            const { text, done = false } = body
            const filename = join(__dirname, "../../database.json")
            const encoding = "utf8"
            const databaseStringConts = readFileSync(filename, encoding)
            const database = JSON.parse(databaseStringConts)
            const data = {
                id, 
                text,
                done,
                //UNIX Epoch Time in ms 
                dateCreated: new Date().getTime(),
                dateUp: new Date().getTime()
            }
            database.todos.push(data)
            const newDatabaseStringConts = JSON.stringify(database, null, 2)
            writeFileSync(filename, newDatabaseStringConts, encoding)
            return {
                success: true,
                data
            }
        }
    })
}

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */