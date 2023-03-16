const { Schema, model } = require("mongoose")

const battleSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Battle name is required']
        },
        bookID: {
            type: String,
            required: [true, 'Book ID is required.']
        },
        movieID: {
            type: String,
            required: [true, 'Movie/TV show ID is required.'],
            // required: [Valor esperado, Mensaje si no sale el valor esperado]
            unique: true   // No es parte de Mongoose Native Validation
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        },
        movie: {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Battle = model("Battle", battleSchema)

module.exports = Battle