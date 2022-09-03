const mongoose = require("mongoose");

const uri = "mongodb+srv://Batato:92547831@cluster0.dcqsn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri);

module.exports = mongoose;