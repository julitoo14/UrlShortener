const Url = require("../models/url");

const getUrl = async (req, res) => {
    const { id } = req.params;
    console.log("Requested ID or Alias:", id);

    // Busca la URL por _id o customAlias
    const url = await Url.findOne({ 
        $or: [
            { _id: id }, 
            { customAlias: id }
        ] 
    });

    console.log("Found URL:", url);

    if (url) {
        url.clicks++;
        await url.save();
        res.redirect(url.longUrl);
    } else {
        res.status(404).json({ error: "URL no encontrada" });
    }
};

const postUrl = async (req, res) => {
    let { longUrl, customAlias } = req.body; // Extraer el customAlias del cuerpo
    console.log("longUrl:", longUrl, "customAlias:", customAlias);
    try {
        // Validar formato del customAlias (solo letras, números y guiones)
        if (customAlias && !/^[a-zA-Z0-9-]+$/.test(customAlias)) {
            return res.status(400).json({ error: 'Invalid alias format. Only letters, numbers, and hyphens allowed.' });
        }

        // Convertir alias a minúsculas para evitar duplicados por diferencia de mayúsculas/minúsculas
        if (customAlias) {
            customAlias = customAlias.toLowerCase();
        }

        // Verificar si ya existe la URL original
        let url = await Url.findOne({ longUrl });
        if (url) {
            return res.status(201).json(url); // Si ya existe, devolver la existente
        }

        // Si hay un customAlias, verificar que no esté en uso
        if (customAlias) {
            const existingAlias = await Url.findOne({ customAlias });
            if (existingAlias) {
                return res.status(400).json({ error: 'Alias already in use' });
            }
        }

        // Crear la nueva URL con o sin customAlias
        const newUrl = new Url({ longUrl, customAlias });
        await newUrl.save();

        res.status(201).json({
            message: "URL successfully shortened",
            longUrl: newUrl.longUrl,
            shortUrl: newUrl.shortUrl,
            customAlias: newUrl.customAlias
        });
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: 'Server error' });
    }
};

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