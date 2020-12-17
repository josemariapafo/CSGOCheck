import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  export default function LoginNuevo(props) {
    const classes = useStyles();
    const history = useHistory();

    function handleSubmit(e){
      e.preventDefault();
      onLogin(e.target["usuario"].value , e.target["contrasena"].value);
    }

    function onLogin(usuario,contrasena){
      fetch('http://localhost:4000/api/inversiones/login',{
        method: 'POST',
        body: JSON.stringify({ user:usuario, password:contrasena }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        })
      .then(res => res.json())
      .then(data => {
        if(data != "NoEncontrado"){
          var datosApp = {
            inventario: data.inventario,
            inventarioLista: data.inventarioLista,
            logueado: true,
            update: false,
            usuario: {
            usuario: usuario,
            contrasena: contrasena,
            }
          }
          props.onLogin(datosApp);
          history.push("/bienvenido");
        }else{
          alert("Usuario no encontrado");
        } 
      })
    }
    
    function onClickLink(){
      history.push("/registro");
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Logueate
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Introduce el usuario"
              name="usuario"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="contrasena"
              label="Contraseña"
              type="password"
              id="contrasena"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdamelo"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Logueate
            </Button>
            <Grid container>
              <Grid item>
                <Link href="" variant="body2" onClick={onClickLink}>
                  {"¿No tienes cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  } 
