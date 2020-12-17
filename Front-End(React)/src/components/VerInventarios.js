import React, {useEffect, useState} from 'react';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import {BrowserRouter as Router, useHistory } from 'react-router-dom';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

  const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 330,
      },
      media: {
        height: '80%',
        width: '80%',
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
  }));

  export default function VerInventarios(props){

    const classes = useStyles();
    const [inventarios,setInventarios] = useState([]);
    const history = useHistory();
    var pintarInventarios = <h1>No hay Inventarios Asociados a esta Cuenta</h1>

    function onVerInventario(inventario){
        
      fetch('http://localhost:4000/api/items/datosGrafica', {
      method: 'POST',
      body: JSON.stringify({ inventario: inventario}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      })
      .then(data => data.json())
      .then(dat => {
        props.onVerInventario(dat);
        history.push('/grafica');
      })
    }

    function onEliminarInventario(titulo){

      fetch('http://localhost:4000/api/inversionesUsuario/eliminarInventario', {
        method: 'POST',
        body: JSON.stringify({ usuario: props.usuario,titulo: titulo}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
      }) 
      .then(data2 => data2.json())
      .then(dat => {
         if(dat.length < inventarios.length){
            setInventarios(dat);
           alert("¡Inventario Eliminado!");
         }else{
           alert("No se ha podido eliminar");
         }
      })
    }
   
    useEffect(() => {

        fetch('http://localhost:4000/api/inversionesUsuario/mostrarInventarios', {
               method: 'POST',
               body: JSON.stringify({ usuario: props.usuario}),
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
                 }
             }) 
             .then(data2 => data2.json())
             .then(dat => {
                setInventarios(dat);
             })
             
    }, []);

    if(inventarios.length !=0 && inventarios !="No tiene Inventarios"){
      console.log("inventarios: "+ inventarios);

      pintarInventarios = inventarios.map((inventario,i) =>{
        return (
          <div class="col-md-4" key={i}>
              <Card className={classes.root}>
                      <CardHeader
                          title={inventario.titulo}
                      />
                      <CardMedia
                          className={classes.media}
                          image={require('../images/weapon.png')}
                          title="Inventory"
                      />
                      <CardActions disableSpacing>
                        <div className="col-md-6" style={{justifyContent:'center'}}>
                          <Fab 
                            color="primary" 
                            aria-label="add" 
                            onClick={() => { 
                              onVerInventario(inventario.inventario)
                            } 
                          }>
                              <RemoveRedEyeIcon/>
                          </Fab>
                        </div>
                        <div className="col-md-6" style={{justifyContent:'center'}}>
                          <Fab 
                            color="secondary" 
                            aria-label="remove" 
                            onClick={() => { 
                              onEliminarInventario(inventario.titulo)
                            } 
                          }>
                            <RemoveCircleIcon/>
                          </Fab>
                        </div>
                      </CardActions>
              </Card>
          </div>
        )
      })
    }

    
    return(
      <div>
        <h1 style={{marginLeft:'45%',marginRight:'45%'}}>Inventarios</h1>
        <div class="row" style={{marginLeft:'20%',marginRight:'20%',marginTop:'2%'}}> 
          {pintarInventarios}
        </div>
      </div>
    )
}