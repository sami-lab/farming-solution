const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Roles = require('./roles');

var UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'A User must have a first Name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'A User must have a last Name'],
      trim: true,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'A User must have an email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please Provide a Valid Email'],
    },
    userName: {
      type: String,
      required: [true, 'A User must have a username'],
    },
    website: {
      type: String,
      validate: [validator.isURL, 'Please Provide a Valid Website URL'],
    },
    bio: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      //validate: [validator.isURL, 'Please Provide a Valid Twitter URL'],
    },
    pinterest: {
      type: String,
      //validate: [validator.isURL, 'Please Provide a Valid Pinterest URL'],
    },
    instagram: {
      type: String,
      //validate: [validator.isURL, 'Please Provide a Valid Instagram URL'],
    },
    dribbble: {
      type: String,
      //validate: [validator.isURL, 'Please Provide a Valid Behance URL'],
    },
    behance: {
      type: String,
      //validate: [validator.isURL, 'Please Provide a Valid Website URL'],
    },
    linkedin: {
      type: String,
      //validate: [validator.isURL, 'Please Provide a Valid LinkedIn URL'],
    },
    github: {
      type: String,
      require: false,
      //validate: [validator.isURL, 'Please Provide a Valid Github URL'],
    },
    password: {
      type: String,
      required: [true, 'A User must have a Password'],
      minlength: [
        5,
        'A User Password must have more or equal then 5 characters',
      ],
      select: false,
    },

    active: {
      type: Boolean,
      default: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles',
        validate: {
          validator: async function (v) {
            return await Roles.findById(v, (err, rec) => rec !== null);
          },
          message: 'Invalid Object ID',
        },
        required: true,
      },
    ],

    passwordResetToken: String,
    passwordResetExpires: Date,
    changedPasswordAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
UserSchema.pre('save', async function (next) {
  //hashing password
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
// UserSchema.pre('save', function(next){ //reset change password date
//   if(!this.isModified('password') || this.isNew) return next()
//     this.changedPasswordAt= Date.now()-1000;
//   next()
// })
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
UserSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
  if (this.changedPasswordAt) {
    const changedTime = parseInt(this.changedPasswordAt.getTime() / 1000, 10);
    return JWTtimestamp < changedTime; //token_issued < changed time(mean Pass changed time)
  }
  return false; //Not Changed
};
UserSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('Sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
