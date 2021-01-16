const { readFileSync } = require("fs")
/**
 * Reads files and gets todo
 * @param {string} filename 
 * @param {[{string}]} encoding
 * @returns {[{ done: boolean, id: string, text: string }]} 
 */
exports.getTodos = (filename, encoding) => {
    const databaseString = readFileSync(filename, encoding)
    const database = JSON.parse(databaseString)
    const { todos } = database
    return todos
}