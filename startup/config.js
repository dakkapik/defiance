const config = require("config");

module.exports = function () {
    if (!config.get("db")) {
        throw new Error("Fatal error: no database...")
    }
}