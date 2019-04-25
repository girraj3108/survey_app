const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

//two arguement means we are tryinng to fetch something from
// the mongoose
mongoose.model('users', userSchema);
