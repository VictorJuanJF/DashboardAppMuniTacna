const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));


//Express hbs
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    //res.send("Hola mundo brys");
    let salida = {
        nombre: 'Victor',
        apellido: 'Jimenez',
        edad: 22,
        url: req.url
    };
    res.render('home', {
        nombre: 'Alexis',
        apellido: 'Rhodes'
    });
});

app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto 3000');
});