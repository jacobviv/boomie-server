const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'El nombre de usuario es obligatorio']
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'El email de usuario es obligatorio'],
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'La contraseña de usuario es obligatoria']
    },
    avatar: {
      type: String,
      required: [false, 'La imagen de avatar se ha personalizado'],
      default: "https://avatars.trackercdn.com/api/avatar/2/TrapOutTheLando.png"
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
    comments: [{
      ref: 'Comment',
      type: Schema.Types.ObjectId
    }]
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
