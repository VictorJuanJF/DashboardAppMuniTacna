const express = require('express');
const hbs = require('hbs');
require('./hbs/helpers');


//Create instance of express app
const app = express();
//We want to serve js and html in ejs
//ejs stands for embedded javascript

const bodyParser = require('body-parser');
const admin = require("firebase-admin");

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');


app.use(express.static('views'));
app.set('views', __dirname + '/views');




// Fetch the service account key JSON file contents
var serviceAccount = require("./munitacna-384ef-firebase-adminsdk-ncnxw-ce29a7bf71");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://munitacna-384ef.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
const refUsers = db.ref("user");
const refReportes = db.ref("reportes");



app.get('/', (req, res) => {
    console.log(req.body);
    res.render('home');
});


app.get('/reportes', (req, res) => {
    var listaReportes;
    let userKeys = [];
    let i = 0;
    refReportes.orderByChild('categoria')

    .on('value', (data) => {
        listaReportes = data.val();
        res.render('listaReportes', { listaReportes });
    })

});

//brus
app.post('/reportes', (req, res) => {
    console.log("solicitud: ", req.body.categoria);
    let categoriaBusqueda = req.body.categoria;
    refReportes.orderByChild("categoria").equalTo(categoriaBusqueda)
        .on('value', (data) => {
            var reportesFiltrados = data.val();
            res.render('listaReportes', { listaReportes: reportesFiltrados });
        });

});


var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});