const mongoose = require("mongoose");
const DB ="mongodb+srv://saitharun:saitharun@node.miewq.mongodb.net/Ufit?retryWrites=true&w=majority";
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
