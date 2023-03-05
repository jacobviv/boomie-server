const { Schema, model } = require("mongoose")
const mongoose = require('mongoose')

const commentSchema = new Schema(
    {
        battle: {
            type: String,
            required: [true, 'Battle ID is required.']
        },
        text: {
            type: String,
            trim: true,
            required: [true, 'Text comment is required.']
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Comment = model('Comment', commentSchema)

module.exports = Comment