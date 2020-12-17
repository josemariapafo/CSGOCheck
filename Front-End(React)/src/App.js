import React, { useState } from 'react';
import BarraSuperior from './components/BarraSuperior';
import Inventario from './components/Inventario';
import ManejadorGrafica from './components/ManejadorGrafica';
import LoginNuevo from './components/LoginNuevo';
import RegisterNuevo from './components/RegisterNuevo';
import Bienvenido from './components/Bienvenido';
import AjusteCuenta from './components/AjustesCuenta';
import CrearInventario from './components/CrearInventario';
import VerInventarios from './components/VerInventarios';
import {
  BrowserRouter as Router, Switch, Route,useHistory,Redirect } from 'react-router-dom';

  export default function App() {
 
    const [appData, setAppData] = useState({
      inventario : [],
      inventarioLista:[],
      logueado: false,
      update: false,
      datosGrafica : {},
      usuario: {
          usuario: String,
          contrasena: String,
          steamId: Number,
      }
    });

    function onLogin(estado){
      setAppData(estado);
    }

    function onRegister(estado){
      setAppData(estado);
    }

    function onClickSalir(){
      setAppData({
        inventario: appData.inventario,
        inventarioLista: appData.inventarioLista,
        logueado: false,
        update: appData.update,
        usuario: {
        usuario: appData.usuario.usuario,
        steamId: appData.usuario.steamId,
        }
      });
    }

    function onVerInventario(datosGrafica){
      setAppData({
        inventario: appData.inventario,
        inventarioLista: appData.inventarioLista,
        logueado: true,
        update: appData.update,
        datosGrafica: datosGrafica,
        usuario: {
          usuario: appData.usuario.usuario,
          steamId: appData.usuario.steamId,
      }});
    }

      
    return(
      <Router> 
            <Switch>
              <PrivateRoute path="/ajustes">
                <BarraSuperior onClickSalir={onClickSalir}/>
                <AjusteCuenta datosUsuario={appData.usuario}/>
              </PrivateRoute>
              <PrivateRoute path="/grafica">
                <BarraSuperior onClickSalir={onClickSalir}/>
                <ManejadorGrafica inventario = {appData.inventarioLista}  datosGrafica={appData.datosGrafica}/>
              </PrivateRoute>
              <PrivateRoute path="/inventario">
                <BarraSuperior onClickSalir={onClickSalir}/>
                <Inventario usuario = {appData.usuario.usuario} inventario = {appData.inventarioLista}/>
              </PrivateRoute>
              <PrivateRoute path="/crearInventario">
                <BarraSuperior onClickSalir={onClickSalir}/>
                <CrearInventario usuario = {appData.usuario.usuario}/>
              </PrivateRoute>
              <PrivateRoute path="/verInventarios">
                <BarraSuperior onClickSalir={onClickSalir}/>
                <VerInventarios usuario = {appData.usuario.usuario} onVerInventario={onVerInventario}/>
              </PrivateRoute>
              <PrivateRoute path="/bienvenido">
                <BarraSuperior onClickSalir={onClickSalir}/>
                <Bienvenido/>
              </PrivateRoute>
              <Route path="/login">
              <LoginNuevo onLogin = {onLogin}/>
              </Route> 
              <Route path="/registro">
                <RegisterNuevo onRegister = {onRegister}/>
              </Route>
              <Route path="/">
                <LoginNuevo onLogin = {onLogin}/>
              </Route> 
            </Switch>
      </Router>
    )
    
    function PrivateRoute({ children, ...rest }) {
      
      return (
        <Route {...rest} render={({ location }) =>
            // Si el usuario está logueado...
            appData.logueado ? (
              // Le dejamos pasar
              children
            ) 
            // De lo contrario
            : (
              // Lo enviamos al login
              <Redirect to={{ pathname: "/login", state: { from: location } }} />
            )
          }
        />
      )
    }
    
  }
