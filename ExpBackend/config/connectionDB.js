const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        console.log("Successfully connect to mongoDB")
    } catch (err) {
        console.log("Error connecting to DB : ", err)
    }
};


module.exports = connectToDB;