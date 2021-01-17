const fastify = require("fastify")
const { route } = require("./route")

/**
 * Initialize server 
 * @param {{ logger: boolean, trustProxy: boolean  }} opts
 * @returns {*} 
 */
exports.build = async (opts = {
    logger: false, 
    trustProxy: false}) => {
        //initialize the server = Fastify
        const app = fastify(opts)
        route(app)
        return app
}

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */