/*
I need:
- a list() to use in movies/:movieId/reviews
- a destroy
- a validation for destroy and update (reviewExists)
- an update
*/

const reviewsService = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function reviewExists(req, res, next) {
    const { reviewId } = req.params
    const review = await reviewsService.read(reviewId)
    if (review) {
        res.locals.review = review 
        return next()
    }
    next({ status: 404, message: "Review cannot be found."})
}

async function destroy(req, res, next) {
    const { review } = res.locals
    await reviewsService.destroy(review.review_id)
    res.sendStatus(204)
}


module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]

}