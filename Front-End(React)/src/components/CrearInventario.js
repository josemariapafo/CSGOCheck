import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Table } from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import { Button,IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Alert from '@material-ui/lab/Alert';
import Fab from '@material-ui/core/Fab';

  export default function CrearInventario(props) {
    
    const [item, setItem] = useState('');
    const [inventario, setInventario] = useState([]);
    const [inventarioNombres, setInventarioNombres] = useState(["hola","adios"]);
    const [wear, setWear] = React.useState('Factory New');
    const [wears, setWears] = useState([{value:'Ninguno',label:'No Wear'}]);
    const [cantidad,setCantidad] = useState();
    const [datosLista,setDatosLista] = useState([]);
    const [nombre, setNombre] = useState("");
    
    const handleChange = (event) => {
      setWear(event.target.value);
    };

    const columns = [
      { dataField: 'nombre', text: 'Nombre del Item'},
      { dataField: 'wear', text: 'Wear'},
      { dataField: 'cantidad', text: 'Cantidad'}
    ];

      function onChangeItemSelect(newInputValue){
        var wearsDisponibles = [];
        inventario.map((item)=>{
          if(item.nombre == newInputValue){
            if(item.wear != "Ninguno"){
              wearsDisponibles.push(item.wear);
            }
          }
        })

        var wearsArray = [];
        wearsDisponibles.map(item=>{
          var wearObj = {};
          wearObj["value"] = item;
          wearObj["label"] = item;
          wearsArray.push(wearObj);
        })

        if(wearsDisponibles.length == 0){
          var obj = {};
          obj["value"] = "Ninguno";
          obj["label"] = "Ninguno";
          wearsArray.push(obj);
        }
        setWears(wearsArray);
      }

      function onCantidad(event){
        setCantidad(event.target.value);
      }

      function onDelete(){
        if(datosLista.length !=0 && item){
          const datosFiltrados = datosLista.filter(item => item.nombre != item);
          setDatosLista(datosFiltrados);
        }else{
          alert("Selecciona el item a borrar");
        }
      }
      function onAdd(){
        if(item && cantidad && wear){
          var obj = {};
          obj["nombre"] = item;
          obj["wear"] = wear;
          obj["cantidad"] = cantidad;
          setWear();
          setDatosLista(datosLista => [...datosLista, obj]);
        }else{
          alert("No has introducido todos los valores");
        }
        //SI TODO ES CORRECTO HAY QUE PONER EN VACIO EL WEAR
      }

      function onGuardarInventario(){
        if(datosLista !=0 && nombre !=""){
            fetch('http://localhost:4000/api/inversionesUsuario/guardarInventario', {
              method: 'POST',
              body: JSON.stringify({ usuario: props.usuario,titulo: nombre, datosLista: datosLista }),
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
            })
          .then(data => data.json())
          .then(data1 => {
            if(data1 == "No-Guardado"){
              alert("¡Ya Tienes 3 Inventarios!");
            }else{
              alert("¡Guardado con Éxito!");
            }
          })
        }else if(!(datosLista !=0)){
          alert("Introduce Items en la Lista");
        }else if(nombre ==""){
          alert("Introduce el Nombre del Inventario");
        }
      }
      
      function onBorrarInventario(){
        setDatosLista([]);
      }

      function onNombre(event){
        setNombre(event.target.value);
      }

    useEffect(() => {
        fetch('http://localhost:4000/api/items/nombresCrearInventario')
        .then(response => response.json())
        .then(inventario => {
            setInventarioNombres(inventario.inventarioNombres);
            setInventario(inventario.inventarioCompleto);
        })
    }, []);

    return (
      <div style={{marginLeft:'15%',marginRight:'15%'}}>
        <h1>Crea tu Inventario Personalizado</h1>
        <Alert severity="info" style={{marginTop:'2%'}}>Para añadir a la lista un item, debes de rellenar todos los campos y darle al botón de añadir</Alert>
        <Alert severity="info" style={{marginTop:'2%'}}>Para eliminar en la lista un item, debes de rellenar solo el campo Item y darle al botón de eliminar</Alert>
        <Alert severity="warning" style={{marginTop:'2%'}}>Hay un máximo de 3 inventarios por cuenta</Alert>
        <Table striped bordered hover style={{marginTop:'2%'}}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Cantidad</th>
              <th>Wear</th>
              <th>Añadir</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <td>
              <Autocomplete
                inputValue={item}
                onInputChange={(event, newInputValue) => {
                  if(newInputValue){
                    onChangeItemSelect(newInputValue);
                  }
                  console.log(newInputValue);
                  setItem(newInputValue);
                }}
                id="controllable-states-demo"
                options={inventarioNombres}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Items" variant="outlined" />}
              />
            </td>
            <td>
              <TextField
                id="standard-number"
                label="Cantidad"
                type="number"
                onChange={onCantidad}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </td>
              <td>
              <TextField
                id="standard-select-currency"
                select
                label="Wear"
                value={wear}
                onChange={handleChange}
                helperText="Seleciona el wear"
              >
                {wears.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </td>
              <td>
                <Fab 
                  color="primary" 
                  aria-label="add" 
                  onClick={() => { 
                    onAdd()
                  } 
                }>
                    <AddIcon/>
                </Fab>
              </td>
              <td>  
                <Fab 
                  color="secondary" 
                  aria-label="add" 
                  onClick={() => { 
                    onDelete()
                  } 
                }>
                    <DeleteIcon/>
                </Fab>
              </td>
          </tbody>
        </Table>
        <br />
        <h4>Lista de Items Añadidos</h4>
        <BootstrapTable
          keyField='nombre'
          data={datosLista}
          columns={columns}
          bordered={false}
          pagination={paginationFactory()}/>
          <br/>
          <div class="row">
          <TextField
                id="standard-number"
                label="Nombre del Inventario"
                onChange={onNombre}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            <div class="col-md-1" style={{marginLeft:'2%'}}>
              <Button variant="contained" color="primary" onClick={onGuardarInventario}>
                Guardar Inventario
              </Button>
            </div>
            <div class ="col-md-1" style={{marginLeft:'2%'}}>
              <Button variant="contained" color="secondary" onClick={onBorrarInventario}>
                Borrar Inventario
              </Button>
            </div>
          </div>
          
      </div>
    );
  }
