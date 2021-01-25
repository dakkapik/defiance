module.exports = function () {
    if (!process.env.db_pswrd) {
        throw new Error("Fatal error: no database...")
    }
}