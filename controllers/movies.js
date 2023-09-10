const NotFoundError = require('../errors/not-found-error');
const Forbidden = require('../errors/forbidden');
const Conflict = require('../errors/conflict');
const { CREATED } = require('../utils/constants');
const Movie = require('../models/movie');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((cards) => res.send({ data: cards }))
  .catch(next);

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Карточка уже существует'));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .populate(['owner'])
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка не найдена');
      } else if (movie.owner._id.valueOf() !== req.user._id) {
        throw new Forbidden('Недостаточно прав');
      }
      Movie.findByIdAndRemove(movie._id)
        .then((deletedMovie) => res.send({ data: deletedMovie }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
