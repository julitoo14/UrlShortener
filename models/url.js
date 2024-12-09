const { Schema, model } = require('mongoose');
const shortid = require('shortid');

const UrlSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  longUrl: {
    type: String,
    required: true,
  },
  customAlias: {
    type: String,
    unique: true, // Evita duplicados en alias personalizados
    sparse: true, // Permite null o undefined
  },
  shortUrl: {
    type: String,
    default: function () {
      return `${process.env.BASE_URL}/${this.customAlias || this._id}`;
    },
  },
  clicks: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Url', UrlSchema);
