const fastify = require("fastify");
const { route } = require("./route")

/**
 * Initialize server 
 * @param {{ logger: boolean, trustProxy: boolean  }} opts
 * @returns {*} 
 */
exports.build = async (opts = {
    logger: true, 
    trustProxy: true}) => {
        //initialize the server = Fastify
        const app = fastify(opts);
        route(app);
        return app;
};