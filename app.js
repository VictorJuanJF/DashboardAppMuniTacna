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


// app.get('/reportes', (req, res) => {
//     var listaReportes;
//     let userKeys = [];
//     let i = 0;
//     refReportes.orderByChild('categoria')

//     .on('value', (data) => {
//         data.forEach((child) => {
//             console.log(child.key + ': ' + JSON.stringify(child.val()));
//         });
//         listaReportes = data.val();

//         console.log("Lista 0: ", listaReportes);

//         // for (i = 0; i < 1; i++) {
//         //     refReportes.child(userKeys[i]).on('value', (data) => {
//         //         console.log(`Reportes del Usuario ${i}: ${JSON.stringify(data.val())}`);
//         //     });

//         // }

//         res.render('listaReportes', { listaReportes: listaReportes });
//     })

// });}

refReportes.on('child_changed', (data) => {
    listaReportes = data.categoria;
    console.log("La categoria es: ", listaReportes);
    app.get('/reportes', (req, res) => {
        res.render('listaReportes', { listaReportes });
    });
});

app.post('/guardar', (req, res) => {
    var objetoBrus = {
        nombre: req.body.firstname,
        apellidosBruses: req.body.lastname
    }
    let newRow = ref.push(objetoBrus);
    console.log(newRow.key);
    res.render('home', {
        titulo: req.body.firstname
    });
});


var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});