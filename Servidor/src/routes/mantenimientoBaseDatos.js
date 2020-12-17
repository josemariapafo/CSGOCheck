const fetch = require('node-fetch');

fetch('http://csgobackpack.net/api/GetItemsList/v2/')
  .then(response => response.json())
  .then(jsonPreciosEscondidos => {

    const arrayIds = [];
    const list = jsonPreciosEscondidos.items_list;
    const listaItemsJson = [];

    for (var clave in list){
    // Controlando que json realmente tenga esa propiedad
        if (list.hasOwnProperty(clave)) {
            arrayIds.push(clave);
        }
    }

    arrayIds.map((id,i)=>{
    var myObj = {};
    myObj["name"] = list[arrayIds[i]].name; 

    for (var clave in list[arrayIds[i]].price){
        // Controlando que json realmente tenga esa propiedad
        if (list[arrayIds[i]].price.hasOwnProperty(clave)) {
        myObj[clave] = list[arrayIds[i]].price[clave].average; 
        }
    }
    listaItemsJson.push(myObj)
    })

    const precios = listaItemsJson;
    const jsonFinal = [];
    var nombresDiferentes = [];
    var todosLosNombres = [];
    const jsonFinalisimo=[];

    precios.map((precio)=>{

        var flag = false;
        var puntoDeCorte = precio.name.indexOf('(');
        var nombreLimpio = precio.name.substring(0,puntoDeCorte-1);
        var wear = precio.name.substring(puntoDeCorte+1,precio.name.length-1);
        var myObj = {};

        if(wear == "Battle-Scarred" || wear == "Factory New" || wear == "Field-Tested"|| wear == "Minimal Wear"|| wear == "Well-Worn"){
            flag = true;
        }
        
        if(flag){
            myObj["name"] = nombreLimpio;
            myObj["wear"] = wear;
        myObj["price"] = precio["30_days"];
        todosLosNombres.push(nombreLimpio)
        
        }else if(flag == false){
            myObj["name"] = precio.name;
            myObj["wear"] = "";
            myObj["price"] = precio["30_days"];
            todosLosNombres.push(precio.name)
        }
        flag == false;
    jsonFinal.push(myObj);
    })

    function seRepite(item) {
        var valor = false;
        for(let i = 0; i<nombresDiferentes.length; i++){
            if(item == nombresDiferentes[i]){
                valor = true;
                return valor;
            }
        }
    }
    
    function iniciarInventario(){
        
        todosLosNombres.map((item)=>{
            if(seRepite(item)){
            }else{
                nombresDiferentes.push(item)
            }
        })
    }
    
    iniciarInventario();

    nombresDiferentes.map((nombre)=>{
        var encontrado = false;
        var myObj = {};
        var wears = {};

        jsonFinal.map((item)=>{
            var precision = 100; // 2 decimals
            var randomnum = Math.floor(Math.random() * (3 * precision - 1 * precision) + 1 * precision) / (1*precision);
            if(nombre == item["name"]){
                encontrado = true;
                if(item["wear"]=="" ){
                    myObj["name"] = item["name"];
                    myObj["price"] = item["price"]*randomnum;
                }else if(item["wear"]!="" && encontrado == true){
                    myObj["name"] = item["name"];
                    wears[item["wear"]] = item["price"]*randomnum;
                }else{
                    wears[item["wear"]] = item["price"]*randomnum;
                }
                
            }
            encontrado = false;
        })
        myObj["wears"] = wears;
        //console.log(myObj)
            jsonFinalisimo.push(myObj);
        })

    const fetch = require('node-fetch');
    var f = new Date();
    //const fecha =((f.getMonth() +1) + "/" + f.getFullYear());
    const fecha = "1/2020";
    var url ='http://localhost:4000/api/items';
    var headers = {
        "Content-Type": "application/json",
        "client_id": "1001125",
        "client_secret": "876JHG76UKFJYGVHf867rFUTFGHCJ8JHV"
    }
    var data = {
        "fecha":fecha, 
        "items":jsonFinalisimo
    }
    const dataString = JSON.stringify(data);
    fetch(url, { method: 'POST', headers: headers, body: dataString})
    .then((res) => {res.json();})
        .then((text) => {
    });
  })
  .catch(err => console.log(err))