import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer, Divider,
  List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import { Menu, ChevronLeft,Equalizer, ListAlt, Settings } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    drawer: {
      width: 240,
      maxWidth: '100vw'
    }
  }))

  export default function BarraSuperior(props) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const history = useHistory();
    const classes = useStyles();

    function goToRoute(route) {
      history.push(route)
    }

    function onClick(){
      props.onClickSalir();
      history.push("/login"); 
    }

    function openDrawer() {
      setIsDrawerOpen(true)
    }

    function closeDrawer() {
      setIsDrawerOpen(false)
    }

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={openDrawer}
            >
              <Menu />
            </IconButton>
            {/**<img src="images/logoCSGOcheck.png" style={{width: "5%",height:"3%"}}/>*/}
            <Typography>
              CSGO Check
            </Typography>
            <Button style={{width: "5%",height:"3%",marginLeft:"90%"}} onClick={onClick}>Salir</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawer,
          }}
          anchor="left"
          open={isDrawerOpen}
          onClose={closeDrawer}
        >
          <div>
            <IconButton onClick={closeDrawer}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={() => goToRoute('/ajustes')}>
              <ListItemIcon><Settings /></ListItemIcon>
              <ListItemText primary="Ajustes de Cuenta" />
            </ListItem>
            <ListItem button onClick={() => goToRoute('/inventario')}>
              <ListItemIcon><ListAlt /></ListItemIcon>
              <ListItemText primary="Ver Inventario" />
            </ListItem>
            <ListItem button onClick={() => goToRoute('/grafica')}>
              <ListItemIcon><Equalizer /></ListItemIcon>
              <ListItemText primary="Evolución del Inventario" />
            </ListItem>
            <ListItem button onClick={() => goToRoute('/crearInventario')}>
              <ListItemIcon><AddIcon/></ListItemIcon>
              <ListItemText primary="Crear Inventario" />
            </ListItem>
            <ListItem button onClick={() => goToRoute('/verInventarios')}>
              <ListItemIcon><VisibilityIcon/></ListItemIcon>
              <ListItemText primary="Ver Inventarios"/>
            </ListItem>
          </List>
        </Drawer>
      </>
    )
  }