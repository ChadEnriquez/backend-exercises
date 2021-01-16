const { build } = require("../app")
require("tap").mochaGlobals()
require("should")

describe("For the route for root (/)", () => {
    let app
    before(async () => {
        app = await build()
    })
    it("It should return { success:true } and statusCode of 200 when called using GET", async () => {
        const response = await app.inject({
            method: "GET",
            url: "/"
        })
        /**
         * Informational responses (100–199)
         * Successful responses (200–299)
         * Redirects (300–399)
         * Client errors (400–499)
         * Server errors (500–599)
         */
        const payload = response.json()
        const { statusCode } = response
        const { success } = payload
        success.should.equal(true)
        statusCode.should.equal(200)
    })
})

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */
