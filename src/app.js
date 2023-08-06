if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json())
//const router = express.Router();

const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")

/*const PORT = process.env.PORT || 5002*/

const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

/*router.get('/', cors(), (req, res) => {
    res.json({ message: "Hello, is this working?" })
})*/

//app.use("/", router);

/*app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})*/

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// Not found handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
