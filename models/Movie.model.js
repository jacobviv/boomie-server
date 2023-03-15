const { Schema, model } = require("mongoose")

const movieSchema = new Schema(
    {
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
            required: [false, 'Movie Overview is not required']
        },
        movieReleaseDate: {
            type: String,
            required: [true, 'Movie Release Date is required']
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