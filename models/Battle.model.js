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
        bookTitle: {
            type: String,
            required: [true, 'Book Title is required']
        },
        bookAuthor: {
            type: String,
            required: [true, 'Book Author is required']
        },
        bookRating: {
            type: Number,
            required: [true, 'Book Rating is required']
        },
        bookCover: {
            type: String,
            required: [true, 'Book Cover is required']
        },
        bookLanguage: {
            type: String,
            required: [true, 'Book Original Language is required']
        },
        bookFirstSentence: {
            type: String,
            required: [true, 'Book First Sentence is required']
        },
        bookPublishingDate: {
            type: String,
            required: [true, 'Book Publishing Date is required']
        },
        movieID: {
            type: String,
            required: [true, 'Movie/TV show ID is required.'],
            // required: [Valor esperado, Mensaje si no sale el valor esperado]
            unique: true   // No es parte de Mongoose Native Validation
        },
        movieTitle: {
            type: String,
            required: [true, 'Movie Title is required']
        },
        movieDirector: {
            type: String,
            required: [true, 'Movie Author is required']
        },
        movieRating: {
            type: Number,
            required: [true, 'Movie Rating is required']
        },
        moviePoster: {
            type: String,
            required: [true, 'Movie Poster is required']
        },
        movieLanguage: {
            type: String,
            required: [true, 'Movie Original Language is required']
        },
        movieOverview: {
            type: String,
            required: [true, 'Movie Overview is required']
        },
        movieReleaseDate: {
            type: String,
            required: [true, 'Movie Release Date is required']
        },
        comments: [{
            ref: 'Comment',
            type: Schema.Types.ObjectId
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