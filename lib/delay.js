/**
 * Delays run of next code line
 * @param {*} delay 
 */
exports.delay = (delay) => new Promise(resolve => setTimeout(resolve, delay))
