const knex = require("../db/connection")

function read(movie_id) {
    return knex("movies")
      .select("*")
      .where({ "movie_id": movie_id })
      .first()
}

function list() {
    return knex("movies").select("*");
}

function listShowing() {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .where({ "mt.is_showing": true })
      .distinct("m.movie_id")
      .select("m.*")
}

function listTheatersShowingMovie(movieId) {
    return knex("theaters as t")
      .join ("movies_theaters as mt", "t.theater_id", "mt.theater_id")
      .where({ "mt.movie_id": movieId, "mt.is_showing": true })
      .select("t.*")
}


module.exports = {
    read,
    list,
    listShowing,
    listTheatersShowingMovie,
}