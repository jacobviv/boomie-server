const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.']
    },
    email: {
      type: String,
      unique: [true, 'User already exists.'],
      required: [true, 'User email is required.'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'User password is required.'],
      minlength: [2, 'Password must have at least 3 characters.']
    },
    avatar: {
      type: String,
      required: [false, 'Avatar image has been saved.'],
      default: "https://avatars.trackercdn.com/api/avatar/2/TrapOutTheLando.png",
      set: value => value === '' ? "https://avatars.trackercdn.com/api/avatar/2/TrapOutTheLando.png" : value
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    battles: [{
      ref: 'Battle',
      type: Schema.Types.ObjectId
    }],
    books: [{
      ref: 'Book',
      type: Schema.Types.ObjectId
    }],
    movies: [{
      ref: 'Movie',
      type: Schema.Types.ObjectId
    }],
    comments: [{
      ref: 'Comment',
      type: Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})


const User = model("User", userSchema)

module.exports = User
