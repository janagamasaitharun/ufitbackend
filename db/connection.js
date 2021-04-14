const mongoose = require("mongoose");
const DB =
  "mongodb+srv://saitharun:saitharun@node.miewq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`connection sucessful`);
  })
  .catch((err) => console.log(`no connection ${err}`));
