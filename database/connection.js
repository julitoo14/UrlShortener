const mongoose = require('mongoose');
var databaseName = 'UrlShortener';
if(process.env.NODE_ENV === 'test'){
    databaseName = 'testdb'
}
const password = process.env.PASSWORD;

const connection = async() =>{
    try{
        await mongoose.connect(`mongodb+srv://juuligarcia2208:0301@urlshortener.n62rwum.mongodb.net/`,
        {dbName: databaseName});
        console.log('Connected to Database ' + databaseName);
    }catch(error){
        console.log(error);
        throw new Error("No se ha establecido la conexion a la base de datos");
    }
}

module.exports = connection;