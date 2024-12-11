// Importowanie potrzebnych modułów
const fsPromises = require('fs').promises;
const express = require('express');
const path = require('path');
const cors = require('cors');
const server = express();
const komentarze = require('./komentarze.json');
const PORT = process.env.PORT||3500;

server.use(express.urlencoded({extended:false,parameterLimit:3,limit:300000,}));
server.use(express.json());
server.use(cors());
// Pobieranie komentarzy
server.get('/pobierzKomentarze',async(req,res)=>{
    const komentarzeDoWyslania = JSON.parse(await fsPromises.readFile(path.join(__dirname,"komentarze.json"),{encoding:"utf-8"}));
    res.status(200).json({
        komentarze:komentarzeDoWyslania
    })

})
// Dodawanie komentarza
server.post('/dodajKomentarz',async(req,res)=>{
    const {nick,email,com} = req.body;
    const komentarzDoWstawienia = {
        nick:nick,
        email:email,
        com:com
    };
    await fsPromises.writeFile(path.join(__dirname,"komentarze.json"),JSON.stringify([...komentarze,komentarzDoWstawienia]));
    res.sendStatus(200);

});
server.listen(3500,()=>console.log(PORT));