import { Schema, model } from 'mongoose';
import { typeList } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: true,
    },
    contactType: {
      type: String,
      required: true,
      default: 'personal',
      enum: typeList,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const sortByList = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

// додаткова перевірка всередені mongoose замість middleware isValidId,
// можна винести функції в окремий файл hooks.js

// contactSchema.post("save", (error, doc, next) => {
//   error.status = 400;
//   next();
// });

// contactSchema.post("findOneAndUpdate", (error, doc, next) => {
//   error.status = 400;
//   next();
// });

// додаткова перевірка всередині mongoose для операції оновлення

// contactSchema.pre("findOneAndUpdate", function(next){
//   this.options.new = true;
//   this.options.runValidators = true;
//   next();
// });

export const contactsCollection = model('contacts', contactSchema);
