const router = require("express").Router({ mergeParams: true })
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")
//const theatersRouter = require("../theaters/theaters.router")

router.route("/:movieId/reviews").get(controller.listReviewsForMovie).all(methodNotAllowed)
router.route("/:movieId/theaters").get(controller.listTheatersShowingMovie).all(methodNotAllowed)
router.route("/").get(controller.list).all(methodNotAllowed)
router.route("/:movieId").get(controller.read).all(methodNotAllowed)

module.exports = router;

/*
For /movies/:movieId/theaters , I think I'll have to write the 
middleware etc. in theaters.controllers. And then I'll import
it from here.
Because I'm basically doing a list() for theaters, but only
for theaters that are playing :movieId. 
*/