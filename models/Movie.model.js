const { Schema, model } = require("mongoose")

const movieSchema = new Schema(
    {
        movieID: {
            type: String,
            required: [true, 'Movie/TV show ID is required.'],
            unique: true
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
            required: [false, 'Movie Poster is not required']
        },
        movieLanguage: {
            type: String,
            required: [false, 'Movie Original Language is not required']
        },
        movieOverview: {
            type: String,
            required: [false, 'Movie Overview is not required']
        },
        movieReleaseDate: {
            type: String,
            required: [false, 'Movie Release Date is required']
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

const Movie = model("Movie", movieSchema)

module.exports = Movie