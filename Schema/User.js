const mongoose = require('mongoose');
const Bcrypt = require ('bcrypt'); 
const saltRounds = 10; 
// user schema
const userScheama = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    mobilenumber:{
        type:String,
        required: true
    },
    token: {
       type:String,
       default:null
    },
    loginstatus:{
      type:Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);
userScheama.pre("save", function(next) {
  if(!this.isModified("password")) {
      return next();
  }
  this.password = Bcrypt.hashSync(this.password, saltRounds);
  next();
});

///for the Bcrypt compare :_id
userScheama.methods.comparePassword = function(plaintext, callback) {
  return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model('User', userScheama);