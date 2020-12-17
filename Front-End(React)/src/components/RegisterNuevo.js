import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router, Switch, Route, Redirect,useHistory
} from 'react-router-dom';

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit">
          CSGO Check
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  export default function RegisterNuevo(props) {
    const history = useHistory();
    const classes = useStyles();

    function handleSubmit(e){
      e.preventDefault();
      //COMPROBAMOS SI LAS DOS CONTRASEÑAS SON IDENTICAS Y SI TODOS LOS CAMPOS ESTAN RELLENOS
      if( e.target["usuario"].value != "" && e.target["contrasena1"].value != ""&& e.target["contrasena2"].value != "" && e.target["steamId"].value!=""){
          if((e.target["contrasena1"].value == e.target["contrasena2"].value)){
              onRegister(e.target["usuario"].value,e.target["contrasena1"].value,e.target["steamId"].value);
              //props.onRegister(e.target["usuario"].value ,  e.target["contrasena1"].value, e.target["steamId"].value);
          }else{
            alert("Las contraseñas no son idétnicas");
          }
          
      }else{
          alert("Faltan campos por rellenar");
      }   
    }

    function onRegister(usuario,contrasena,steamId){
      fetch('http://localhost:4000/api/inversiones/register', {
        method: 'POST',
        body: JSON.stringify({ usuario:usuario, contrasena:contrasena, steamId:steamId }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }) 
    .then(data => data.json())
    .then(data => {
        if(data != "NoRegistrado"){
          var estado = {
            inventario: data.inventario,
            inventarioLista: data.inventarioLista,
            logueado: true,
            update: false,
            usuario: {
            usuario: usuario,
            contrasena: contrasena,
            steamId: steamId,
            }
          }
          props.onRegister(estado);
          history.push("/bienvenido");
        }else{
          alert("!Usuario ya registrado¡");
        }
    }) 
    }

    function onClick(){
      history.push("/login");
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrate
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="usuario"
                  variant="outlined"
                  required
                  fullWidth
                  id="usuario"
                  label="Usuario"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type = "number"
                  variant="outlined"
                  required
                  fullWidth
                  id="steamId"
                  label="Steam ID"
                  name="steamId"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="contrasena1"
                  label="Contraseña"
                  type="password"
                  id="contrasena1"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="contrasena2"
                  label="Contraseña"
                  type="password"
                  id="contrasena2"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Resgistrate
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="" variant="body2" onClick={onClick}>
                ¿Ya tienes una cuenta? Logueate
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
