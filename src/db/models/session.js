import { Schema, model } from 'mongoose';

export const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

sessionSchema.post('save', (error, doc, next) => {
  const { name, code } = error;
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;
  next();
});

sessionSchema.post('findOneAndUpdate', (error, doc, next) => {
  error.status = 400;
  next();
});

sessionSchema.pre('findOneAndUpdate', function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
});

export const sessionCollection = model('session', sessionSchema);
