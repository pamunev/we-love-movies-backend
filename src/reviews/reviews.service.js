/*
I need:
- a list() to use in movies/:movieId/reviews
- a read() for validation that a review exists
- a destroy
- an update
*/

function read(reviewId) {
    return knex("reviews")
      .select("*")
      .where( {"review_id": reviewId })
      .first()
}

function destroy(reviewId) {
    return knex("reviews")
      .where({ "review_id": reviewId })
      .del()
}


module.exports = {
    read,
    destroy,
}