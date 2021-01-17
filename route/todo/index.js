const { create } = require("./create")
const { getMany } = ("./get-many")

/**
 * initialize routes for creating todo
 * @param {*} app 
 */
exports.todo = (app) => {
    create(app)
    getMany(app)
}

/**
 * ENRIQUEZ, CHAD ANDREI A.
 */