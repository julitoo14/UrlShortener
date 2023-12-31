const Url = require("../models/url");

const getUrl = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const url = await Url.findById(id);
    if (url) {
        url.clicks++;
        await url.save();
        res.redirect(url.longUrl);
    } else {
        res.status(404).json({ error: "URL no encontrada" });
    }
}

const postUrl = async (req, res) => {
    const { longUrl } = req.body;
    console.log(longUrl)
    const url = await Url.findOne({ longUrl });
    if (url) {
        res.json(url);
    } else {
        const newUrl = new Url({ longUrl });
        await newUrl.save();
        res.json(newUrl);
    }
}

const getMetrics = async (req, res) => {
    const { id } = req.params;
    const url = await Url.findById(id);
    if (url) {
        res.json(url);
    } else {
        res.status(404).json({ error: "URL no encontrada" });
    }
}

const getUrls = async (req, res) => {
    const urls = await Url.find();
    res.json(urls);
}

const deleteUrl = async (req, res) => {
    const { id } = req.params;
    const url = await Url.findByIdAndDelete(id);
    if (url) {
        res.json(url);
    } else {
        res.status(404).json({ error: "URL no encontrada" });
    }
}

module.exports = {
    getUrl,
    postUrl,
    getMetrics,
    getUrls,
    deleteUrl
}