const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REGEXP_LINK } = require('../utils/constants');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const currentYear = new Date().getFullYear();

movieRouter.get('/', getMovies);

movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().integer().required(),
    year: Joi.number().integer().min(1895).max(currentYear),
    description: Joi.string().required().min(2).max(1000),
    image: Joi.string().required().pattern(REGEXP_LINK),
    trailer: Joi.string().required().pattern(REGEXP_LINK),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    thumbnail: Joi.string().required().pattern(REGEXP_LINK),
    movieId: Joi.number().integer().required(),
  }),
}), createMovie);

movieRouter.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = movieRouter;
