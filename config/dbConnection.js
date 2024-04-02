const mongoose = require("mongoose")

const url = "mongodb://127.0.0.1:27017/CrudJS"
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(url);

        console.log("Database Connected",connect.connection.host,connect.connection.name)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
};

module.exports = connectDb

