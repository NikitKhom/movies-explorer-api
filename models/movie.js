const mongoose = require('mongoose');
const { REGEXP_LINK } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return REGEXP_LINK.test(v);
        },
        message: 'Ссылка указана некорректно',
      },
    },
    trailer: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return REGEXP_LINK.test(v);
        },
        message: 'Ссылка указана некорректно',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return REGEXP_LINK.test(v);
        },
        message: 'Ссылка указана некорректно',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
      unique: true,
    },
    nameRU: {
      type: String,
      requireed: true,
    },
    nameEN: {
      type: String,
      requireed: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
