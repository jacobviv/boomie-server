const { Schema, model } = require("mongoose")

const bookSchema = new Schema(
    {
        bookID: {
            type: String,
            required: [true, 'Book ID is required.'],
            unique: true
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
            required: [false, 'Book Cover is not required']
        },
        bookLanguage: {
            type: String,
            required: [false, 'Book Original Language is not required']
        },
        bookFirstSentence: {
            type: String,
            required: [false, 'Book First Sentence is not required']
        },
        bookPublishingDate: {
            type: String,
            required: [false, 'Book Publishing Date is required']
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Book = model("Book", bookSchema)

module.exports = Book