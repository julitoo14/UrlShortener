const {Schema, model} = require('mongoose');
const shortid = require('shortid');

const UrlShcema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        default: function() {
            return `${process.env.BASE_URL}/${this._id}`
        }
    },
    clicks: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Url', UrlShcema);