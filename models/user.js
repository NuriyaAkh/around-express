const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name required'],
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'User desciption required'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        /https?:\/\/(www\.)?\S+\/[-._~:/?%#[\]@!$&'()*+,;=\w]*#?$/.test(v);
      },
      message: 'Please enter a valid link starting with "http" or "https"',
    },

  },

});
module.exports = mongoose.model('user', userSchema);
