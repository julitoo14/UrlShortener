//dependencies
const express = require('express');
const cors = require('cors');
const connection = require('./database/connection');

const app = express();
const port = 3000;

connection();
app.use(cors());
app.use(express.json());


//routes
app.use('/', require('./routes/url.routes'));


app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
});
