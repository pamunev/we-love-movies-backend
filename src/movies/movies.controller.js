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
    const movies = await moviesService.list();
    //console.log(movies)
    res.json({ data: movies })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
}