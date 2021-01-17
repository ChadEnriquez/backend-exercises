const { build } = require('./app')

/**
 * starts app
 */
async function start () {
    //call build app 
    const app = await build({
        logger: true,
        trustProxy: true
      })
    //get port from env variable
    //IF export PORT=8000 && node index.js
    //then port = 8000 else default is 8080
    const port = parseInt(process.env.PORT || "8080")
    const address = "0.0.0.0"
    const addr = await app.listen(port, address)
    console.log(`Listening on ${addr}`) 
}

start()

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */