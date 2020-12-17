const express = require('express');
const router = express.Router();
const inventariosUsuario = require('../models/inventariosUsuario');

router.post('/guardarInventario',async(req,res)=>{

    const {usuario,titulo,datosLista} = req.body;
    var inventarioGuardar= {};
    var inventariosMeter = [];
    const objetoBD = await inventariosUsuario.findOne({usuario: usuario});
    
    if(objetoBD){
        //maximo de 3 inventarios por persona
        if(objetoBD.inventarios.length <3){
            for(let i = 0; i<objetoBD.inventarios.length; i++){
                console.log("metido")
                var obj = {};
                obj["titulo"] = objetoBD.inventarios[i].titulo;
                obj["inventario"] = objetoBD.inventarios[i].inventario;
                inventariosMeter.push(obj);
            }  
            var obj = {};
            obj["titulo"] = titulo;
            obj["inventario"] = datosLista;
            inventariosMeter.push(obj);
            await objetoBD.update({usuario: usuario,inventarios: inventariosMeter})
            res.json("Guardado");
        }else{
            res.json("No-Guardado");
        }
    }else{
        var obj = {};
        obj["titulo"] = titulo;
        obj["inventario"] = datosLista;
        inventariosMeter.push(obj);
        inventarioGuardar = inventariosUsuario({usuario: usuario,inventarios: inventariosMeter});
        await inventarioGuardar.save();
        res.json("Guardado");
    }
})


router.post('/mostrarInventarios',async(req,res)=>{

    const {usuario} = req.body;
    const objetoBD = await inventariosUsuario.findOne({usuario: usuario});

    if(objetoBD){
        res.json(objetoBD.inventarios);
    }else{
        res.json("No tiene Inventarios");
    }
})

router.post('/eliminarInventario',async(req,res)=>{

    const { usuario,titulo } = req.body;
    console.log("Usuario; "+usuario);
    console.log("Titulo: "+titulo);
    const inventariosBD = await inventariosUsuario.findOne({usuario: usuario});
    var inventariosActualizados = [];

    if(inventariosBD){
        console.log(inventariosBD);
        inventariosBD.inventarios.map((inventario)=>{
            if(inventario.titulo != titulo){
                inventariosActualizados.push(inventario);
            }
        });
        await inventariosUsuario.replaceOne(inventariosBD,{usuario: inventariosBD.usuario, inventarios: inventariosActualizados});
        res.json(inventariosActualizados);
    }else{
        res.json("NoActualizado");
    }
})

module.exports = router;