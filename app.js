const fastify = require("fastify");

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
        //block to access root address
        app.get("/", {
            //object
            /**
             * @param {*} req //request parameter which is sent by client 
             */
            handler: async (req) => {
                console.log("Hello World!");
                //response in JSON format
                return { success: true } 
            }
        })
        
        return app;
};