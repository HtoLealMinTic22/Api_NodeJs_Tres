const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
const router = express.Router();
const UserSchema = require('./models/User.js')


// Ejecutar "node index.js"
// Conectamos con la BD
mongoose.connect("mongodb+srv://HumbertoLeal:Mongohto2022@misiontic2022hto.rnc3znp.mongodb.net/tes")
app.use(express.urlencoded({extended: true}))
app.use(express.json())

router.get('/user', (req, res) => {
    UserSchema.find(function(err, data){
        if(err){
            console.log(err)
        }else{
            res.send(data)
        }
    })
});


// con este metodo guardamos un usuario 
router.post('/user', (req, res) => {
    let newUser = new UserSchema({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password: req.body.password,
    })

    newUser.save(function(err, data){
        if(err){
            console.log(err)
        }else{
        res.send("saved successfully " + newUser)
        }
    });
})


app.use(router)
app.listen(port,() => {
    console.log('Listening on '+port)
})


//  ok - http://localhost:3000/saludar/:Humberto Leal Guzman
router.get('/saludar/:nombre', (req, res) => {
    var nombre = req.params.nombre; 
    res.send("Hello " + nombre);
});




//  ok - http://localhost:3000/validar_edad/:15
router.get('/validar_edad/:edad', (req, res) => {
    var edad = req.params.edad; 
    var respuesta = '';
    if(edad >= 18){
        respuesta = "Mayor de edad";
    }else{
        respuesta = "Menor de edad";
    }
    res.send(respuesta);
});

