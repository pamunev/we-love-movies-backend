// Where do I start?
/* 
- First I do a simple list function.
- Let's just give it a go. 
- What stuff do I need to import?
*/

const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId)
    if (movie) {
        res.locals.movie = movie;
        return next()
    }
    next({ status: 404, message: `Movie cannot be found` })
}

function read(req, res) {
    const { movie: data } = res.locals
    res.json({ data })
}

async function list(req, res, next) {
    const isShowing = req.query.is_showing
    
    let movies
    if (isShowing) {
        movies = await moviesService.listShowing()
    } else {
        movies = await moviesService.list();
    }
    res.json({ data: movies })
}

async function listTheatersShowingMovie(req, res, next) {
    const movieId = req.params.movieId
    const theaters = await moviesService.listTheatersShowingMovie(movieId)
    res.json({ data: theaters })
}

async function listReviewsForMovie(req, res, next) {
    const movieId = req.params.movieId
    const reviews = await moviesService.listReviewsForMovie(movieId)
    res.json({ data: reviews })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listTheatersShowingMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersShowingMovie)],
    listReviewsForMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviewsForMovie)],
}