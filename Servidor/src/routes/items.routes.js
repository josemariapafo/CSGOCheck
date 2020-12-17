const express = require('express');
const router = express.Router();
const Items = require('../models/items');

router.post('/', async(req,res)=>{
    const { fecha,items} = req.body;
    const itemsGuardar = new Items({fecha,items});
    await itemsGuardar.save();
    res.json({status: "Items Guardados"})
})

router.post('/datosGrafica',async(req,res)=>{
    var fechas = [];
    var cantidadesTotales = [];
    var datosGrafica = [];
    const {inventario} = req.body;
    const itemMeses = await Items.find();

    itemMeses.map((mes)=>{
        var obj = {};
        obj["fecha"] = mes.fecha;
        var total = 0;

        inventario.map((item)=>{ //item del inventario
            mes.items.map((itemBD,i)=>{ // item de la bd
                
                if((item.nombre==itemBD.name) && (item.wear=="Ninguno")){
                   total = (parseFloat(total) + (item.cantidad*itemBD.price)).toFixed(2);
                }else if((item.nombre==itemBD.name) && (item.wear != "Ninguno") ){
                    total = (parseFloat(total) + (itemBD.wears[item.wear] * item.cantidad)).toFixed(2);
                }
            })
            
        })
        obj["precioTotal"] = total;
        datosGrafica.push(obj);
        
    })

    datosGrafica.map((datos)=>{
        fechas.push(datos.fecha);
        cantidadesTotales.push(datos.precioTotal);
    })
    res.json({fechas: fechas, cantidadesTotales: cantidadesTotales});
})

router.get('/nombresCrearInventario', async(req,res)=>{
    var f = new Date();
    const fecha =((f.getMonth() +1) + "/" + f.getFullYear());
    var itemsMesActual = await Items.findOne({fecha:fecha});
    var nuevoInventario =[];
    var nombresItems = [];

    itemsMesActual.items.map((item)=>{
                nombresItems.push(item.name);
                var itemActual = {};
                for(var key in item){
                    if(key=="wears"){
                        for(var key2 in item.wears){
                            itemActual["nombre"]  = item.name;
                            itemActual["wear"]  = key2;
                            nuevoInventario.push(itemActual);
                            itemActual = {};
                        }  
                    }
                    if(key == "price"){
                        itemActual["nombre"]  = item.name;
                        itemActual["wear"]  = "Ninguno";
                        nuevoInventario.push(itemActual);
                    }
                }
            })
    res.json({"inventarioCompleto":nuevoInventario,"inventarioNombres":nombresItems});
})

module.exports = router;