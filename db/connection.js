const mongoose = require("mongoose");
const DB =process.env.MONGO_URI;
  const connectDB = async () => {
      const connection = await mongoose.connect(DB, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
      });
  
      console.log(`MongoDB Connected: ${connection.connection.host}`);
  }; 
  
  module.exports = connectDB;