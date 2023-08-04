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

async function update(req, res, next) {
    const { review } = res.locals;
    const updatedReview = {
        ...review,
        ...req.body.data,
        review_id: review.review_id
    }
    const newReview = await reviewsService.update(review.review_id, updatedReview)
    res.json({ data: newReview })
}

async function destroy(req, res, next) {
    const { review } = res.locals
    await reviewsService.destroy(review.review_id)
    res.sendStatus(204)
}


module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]

}