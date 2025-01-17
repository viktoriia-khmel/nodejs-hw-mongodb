import { Schema, model } from 'mongoose';
import { emailRegExp } from '../../constants/users.js';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegExp,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.post('save', (error, doc, next) => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
});

userSchema.post('findOneAndUpdate', (error, doc, next) => {
  error.status = 400;
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
});

export const userCollection = model('user', userSchema);
