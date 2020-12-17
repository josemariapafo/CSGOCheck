import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Equalizer, ListAlt } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import {BrowserRouter as Router, useHistory } from 'react-router-dom';

    const useStyles = makeStyles((theme) => ({
        root: {
        maxWidth: 345,
        boxShadow:'5px 10px 20px 1px',
        marginTop:'5%',
        },
        media: {
        height: '55%',
        width: '55%',
        marginLeft: '15%',
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
        avatar: {
        backgroundColor: red[500],
        },
    }));

    export default function Bienvenido() {
        
        const classes = useStyles();
        const history = useHistory();

        function goToRute(ruta){
            history.push(ruta);
        }

        return(
            <div>
                <h1 style={{marginLeft: '40%',marginRight:'40%',marginTop:'2%'}}><u>SERVICIOS</u></h1>
                <div class="row" style={{marginLeft:'15%',marginRight:'15%'}}>
                    <div class="col-md-4">
                    <Card className={classes.root}>
                        <CardHeader
                            title="Tabla de inventario"
                            subheader="Héchame un vistazo"
                        />
                        <CardMedia
                            className={classes.media}
                            image={require('../images/inventario.png')}
                            title="Lista"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Aquí encontrarás la mejor forma de visualizar los items de tu inventario
                            de manera organizada.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="Mira tu inventario" onClick={()=>{goToRute("/inventario")}}>
                                <ListAlt />
                            </IconButton>
                        </CardActions>
                        </Card>
                    </div>
                    <div class="col-md-4">
                    <Card className={classes.root}>
                        <CardHeader
                            title="Evolución del Inventario"
                            subheader="Héchame un vistazo"
                        />
                        <CardMedia
                            className={classes.media}
                            image={require('../images/barra-de-grafico.png')}
                            title="Gráfica"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Aquí encontrarás la oportunidad de ver los precios de tu inventario a lo largo del año 
                            y las perdidas/ganancias que hayas tenido en comparación a otros meses.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="Mira tu inventario" onClick={()=>{goToRute("/grafica")}}>
                                <Equalizer />
                            </IconButton>
                        </CardActions>
                        </Card>
                    </div>
                    <div class="col-md-4">
                    <Card className={classes.root}>
                        <CardHeader
                            title="¡Crea Tu Inventario!"
                            subheader="Héchame un vistazo"
                        />
                        <CardMedia
                            className={classes.media}
                            image={require('../images/dibujo.png')}
                            title="Crear"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Aquí encontrarás la oportunidad de poder crear inventarios ficticios para ver
                            la evolución que han tenido estos.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="Mira tu inventario" onClick={()=>{goToRute("/crearInventario")}}>
                                <AddIcon />
                            </IconButton>
                        </CardActions>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }