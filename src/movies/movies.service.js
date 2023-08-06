const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")


const addCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
  });

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

function listReviewsForMovie(movieId) {
    return knex("movies as m")
      .join("reviews as r", "r.movie_id", "m.movie_id")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select("*")
      .where({ "m.movie_id": movieId })
      .then((reviews) => reviews.map(addCritic));
}


module.exports = {
    read,
    list,
    listShowing,
    listTheatersShowingMovie,
    listReviewsForMovie
}