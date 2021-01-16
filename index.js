const Fastify = require("fastify");

//initialize the server = Fastify
const server = Fastify({
    logger: true,
    trustProxy: true,  
});

//block to access root address
server.get("/", {
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
async function start () {
    //get port from env variable
    //IF export PORT=8000 && node index.js
    //then port = 8000 else default is 8080
    const port = parseInt(process.env.PORT || "8080")
    const address = "0.0.0.0";
    const addr = await server.listen(port, address);
    console.log(`Listening on ${addr}`); 
}

start()