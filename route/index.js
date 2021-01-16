const { todo } = require("./todo")
/**
 * initialize routes
 * @param {*} app 
 */
exports.route = (app) => {
    //block to access root address
    app.get("/", {
        //object
        /**
         * @param {*} req //request parameter which is sent by client 
         */
        handler: async (req) => {
            console.log("Hello World!")
            //response in JSON format
            return { success: true } 
        }
    })
    todo(app)
}

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */