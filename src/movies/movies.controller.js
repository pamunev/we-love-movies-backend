// Where do I start?
/* 
- First I do a simple list function.
- Let's just give it a go. 
- What stuff do I need to import?
*/

const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res, next) {
    const movies = await moviesService.list();
    console.log(movies)
    res.json({ data: movies })
}

module.exports = {
    list: asyncErrorBoundary(list),
}