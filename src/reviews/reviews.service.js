/*
I need:
- a list() to use in movies/:movieId/reviews
- a read() for validation that a review exists
- a destroy
- an update
*/
const knex = require("../db/connection")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

function read(reviewId) {
    return knex("reviews")
      .select("*")
      .where( {"review_id": reviewId })
      .first()
}

async function update(reviewId, updatedReview) {
    await knex("reviews")
      .where({ "review_id": reviewId })
      .update(updatedReview)
      .returning("*")

    return read(reviewId)
}

function destroy(reviewId) {
    return knex("reviews")
      .where({ "review_id": reviewId })
      .del()
}


module.exports = {
    read,
    update: asyncErrorBoundary(update),
    destroy,
}