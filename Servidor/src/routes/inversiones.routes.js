const express = require('express');
const router = express.Router();
const axios = require('axios');
const Inversiones = require('../models/inversiones');
const Items = require('../models/items');

    router.post('/login', async(req,res)=>{

        const {user,password} = req.body;
        const usuario = await Inversiones.findOne({usuario:user,contrasena: password });
        console.log(usuario);

        //Recogemos todos los items del mes actual
        var nuevoInventario =[];
        var f = new Date();
        const fecha =((f.getMonth() +1) + "/" + f.getFullYear());
        const items = await Items.findOne({fecha: fecha});

        

        if(usuario){

            usuario.inventario.map((item,h)=>{
                var itemActual = {};
                var flag = false;
                var puntoDeCorte = item.nombre.indexOf('(');
                var nombreLimpio = item.nombre;
                var wear = item.nombre.substring(puntoDeCorte+1,item.nombre.length-1);
            
                if(wear == "Battle-Scarred" || wear == "Factory New" || wear == "Field-Tested"|| wear == "Minimal Wear"|| wear == "Well-Worn"){
                    nombreLimpio = item.nombre.substring(0,puntoDeCorte-1);
                    flag = true;
                }

                items.items.map((itemBD,i)=>{
                
                    if(flag){
                        if(itemBD.name === nombreLimpio){
                            for(var key in itemBD.wears){
                                    if(key===wear){
                                        itemActual["nombre"]  = itemBD.name;
                                        itemActual["wear"]  = wear;
                                        itemActual["cantidad"] = item.cantidad;
                                        itemActual["precioTotal"] = (item.cantidad * itemBD.wears[key]).toFixed(2);
                                        itemActual["precioUnitario"] = (itemBD.wears[key]).toFixed(2);
                                    }
                                }
                        }
                    }else if(!flag){
                        if(itemBD.name === nombreLimpio){
                            itemActual["nombre"]  = itemBD.name;
                            itemActual["wear"]  = "Ninguno";
                            itemActual["cantidad"] = item.cantidad;
                            itemActual["precioTotal"] = (item.cantidad * itemBD.price).toFixed(2);
                            itemActual["precioUnitario"] = itemBD.price.toFixed(2);
                        }
                    }
                })
                nuevoInventario.push(itemActual);
            })
        
            res.json({inventario: usuario.inventario,inventarioLista: nuevoInventario});
        }else{
            res.json("NoEncontrado");
        }
    });

    router.post('/cambio-contrasena', async(req,res)=>{

        const {usuario,contrasenaActual,contrasenaNueva} = req.body;
        var usuarioBD = await Inversiones.findOne({usuario: usuario});

        if(usuarioBD.contrasena == contrasenaActual){
            await Inversiones.replaceOne({usuario: usuario},{usuario: usuarioBD.usuario,
                contrasena: contrasenaNueva, steamId: usuarioBD.steamId, inventario: usuarioBD.inventario})
            res.json("contrasenaActualCorrecta")
        }else{
            console.log("No es la contraseña actual de su cuenta")
            res.json("contrasenaActualIncorrecta")
        }
    })

    router.post('/cambio-steamId', async(req,res)=>{

        var nombres=[];
        var classids= [];
        var cantidades=[];
        var inventario = [];
        const { usuario,steamId } = req.body;
        var usuarioBD = await Inversiones.findOne({usuario: usuario});

        //HACEMOS UNA PETICIÓN A LA IP REST DE STEAM PARA COGER EL INVENTARIO Y GUARDARLO EN NUESTRA BD
            await axios.get('http://steamcommunity.com/inventory/'+steamId+'/730/2?l=english&count=5000')
                .then(async function (response) {
                    // handle success
                    
                    response.data.descriptions.map((item)=>{
                        classids.push(item.classid);
                        nombres.push(item.market_hash_name);
                    })
                    
                    classids.map((id)=>{
                        var contador = 0;
                        response.data.assets.map((item)=>{
                        if(id == item.classid){
                            contador  = contador +1;
                        }
                        })
                        if(contador != 0){
                        cantidades.push(contador);
                        }
                    })

                    for(let i =0; i<classids.length; i++){
                        var obj = {}
                        obj["nombre"] =nombres[i];
                        obj["cantidad"] = cantidades[i];
                        inventario.push(obj);
                    }

                    await Inversiones.replaceOne(usuarioBD,{usuario: usuarioBD.usuario,
                        contrasena: usuarioBD.contrasena, steamId: steamId, inventario: inventario});
                })
                .catch(function (error) {
                    // handle error
                    console.log("steamID malo")
                    console.log(error);
                })
                .then(function () {
                    // always executed
            });
            res.json(inventario);
    })

    router.post('/register', async(req,res)=>{
        var classids= [];
        var nombres=[];
        var cantidades=[];
        var inventario = [];
        var nuevoInventario = [];
        const { usuario,contrasena,steamId} = req.body;

        //Recogemos todos los items del mes actual
        var f = new Date();
        const fecha =((f.getMonth() +1) + "/" + f.getFullYear());
        console.log("Fecha actual: "+fecha);
        const items = await Items.findOne({fecha: fecha});

        var usuarioBD = await Inversiones.findOne({usuario:usuario});

        if(usuarioBD){
            console.log("Este usuario ya existe")
            res.json("NoRegistrado");
        }else{
            //Enviamos un request a la api de steam para coger el inventario y procesamos la información
            await axios.get('http://steamcommunity.com/inventory/'+steamId+'/730/2?l=english&count=5000')
            .then(function (response) {
                // handle success
                
                response.data.descriptions.map((item)=>{
                    classids.push(item.classid);
                    nombres.push(item.market_hash_name);
                })
                
                classids.map((id)=>{
                    var contador = 0;
                    response.data.assets.map((item)=>{
                        if(id == item.classid){
                            contador  = contador +1;
                        }
                    })
                        if(contador != 0){
                        cantidades.push(contador);
                        }
                })

                for(let i =0; i<classids.length; i++){
                    var obj = {}
                    obj["nombre"] =nombres[i];
                    obj["cantidad"] = cantidades[i];
                    inventario.push(obj);
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
            const inversiones = new Inversiones({usuario,contrasena,steamId,inventario});
            await inversiones.save();

            inventario.map((item,h)=>{
                var itemActual = {};
                var flag = false;
                var puntoDeCorte = item.nombre.indexOf('(');
                var nombreLimpio = item.nombre;
                var wear = item.nombre.substring(puntoDeCorte+1,item.nombre.length-1);
            
                if(wear == "Battle-Scarred" || wear == "Factory New" || wear == "Field-Tested"|| wear == "Minimal Wear"|| wear == "Well-Worn"){
                    nombreLimpio = item.nombre.substring(0,puntoDeCorte-1);
                    flag = true;
                }

                items.items.map((itemBD,i)=>{
                
                    if(flag){
                        if(itemBD.name === nombreLimpio){
                            for(var key in itemBD.wears){
                                    if(key===wear){
                                        itemActual["nombre"]  = itemBD.name;
                                        itemActual["wear"]  = wear;
                                        itemActual["cantidad"] = item.cantidad;
                                        itemActual["precioTotal"] = (item.cantidad * itemBD.wears[key]).toFixed(2);
                                        itemActual["precioUnitario"] = (itemBD.wears[key]).toFixed(2);
                                    }
                                }
                        }
                    }else if(!flag){
                        if(itemBD.name === nombreLimpio){
                            itemActual["nombre"]  = itemBD.name;
                            itemActual["wear"]  = "Ninguno";
                            itemActual["cantidad"] = item.cantidad;
                            itemActual["precioTotal"] = (item.cantidad * itemBD.price).toFixed(2);
                            itemActual["precioUnitario"] = itemBD.price.toFixed(2);
                        }
                    }
                })
                nuevoInventario.push(itemActual);
            })
            
            res.json({inventario: inventario,inventarioLista: nuevoInventario});
        }
    })

    //-------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------

    router.post('/precios', async(req,res)=>{
        
        const { inventario } = req.body;
        console.log(inventario)
        var nuevoInventario =[];

        await axios.get('http://localhost:4000/api/items/items-mes')
        .then(function (response) {

            inventario.map((item,h)=>{
                var itemActual = {};

                var flag = false;
                var puntoDeCorte = item.nombre.indexOf('(');
                var nombreLimpio = item.nombre;
                var wear = item.nombre.substring(puntoDeCorte+1,item.nombre.length-1);
            
                if(wear == "Battle-Scarred" || wear == "Factory New" || wear == "Field-Tested"|| wear == "Minimal Wear"|| wear == "Well-Worn"){
                    nombreLimpio = item.nombre.substring(0,puntoDeCorte-1);
                    flag = true;
                }

                response.data.items.map((itemBD,i)=>{
                
                    if(flag){
                        if(itemBD.name === nombreLimpio){
                            for(var key in itemBD.wears){
                                    if(key===wear){
                                        itemActual["nombre"]  = itemBD.name;
                                        itemActual["wear"]  = wear;
                                        itemActual["cantidad"] = item.cantidad;
                                        itemActual["precioTotal"] = (item.cantidad * itemBD.wears[key]).toFixed(2);
                                        itemActual["precioUnitario"] = (itemBD.wears[key]).toFixed(2);
                                    }
                                }
                        }
                    }else if(!flag){
                        if(itemBD.name === nombreLimpio){
                            itemActual["nombre"]  = itemBD.name;
                            itemActual["wear"]  = "Ninguno";
                            itemActual["cantidad"] = item.cantidad;
                            itemActual["precioTotal"] = (item.cantidad * itemBD.price).toFixed(2);
                            itemActual["precioUnitario"] = itemBD.price.toFixed(2);
                        }
                    }
                })
                nuevoInventario.push(itemActual);

            })
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
        
        res.json(nuevoInventario);
        //RETORNAR EL INVENTARIO CON SU NOMBRE CANTIDAD WEAR VALORTOTAL VALORUNITARIO
    })


    module.exports = router;