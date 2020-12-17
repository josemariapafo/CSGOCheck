import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

    export default function Tarjetas_Grafica(props){

        var primerMes = "Enero";
        var ultimoMes = "Diciembre";
        var profit = {cantidad:0,estilo:'positivo'};
        const meses = {1:"Enero",2:"Febrero",3:"Marzo",4:"Abril",5:"Mayo",6:"Junio",7:"Julio",8:"Agosto",9:"Septiembre",10:"Octubre",11:"Noviembre",12:"Diciembre"};

        if(props.primerMesValue && props.ultimoMesValue){
            var prof = props.ultimoMesValue / props.primerMesValue;
            if(prof >= 1){
                profit = {cantidad:((prof -1)*100).toFixed(2),estilo:'positivo'};
            }else if(prof<1){
                profit = {cantidad:((1-prof)*100).toFixed(2),estilo:'negativo'};
            }
            primerMes=meses[props.primerMes];
            ultimoMes=meses[props.ultimoMes];
        }

        return(
            <div class="row">
                <div class="col-md-4">
                    <Card >
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom style={{color: 'black'}}>
                                Precio Total de {primerMes}
                                <br></br>
                                {props.primerMesValue}$
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div class="col-md-4" >
                    <Card >
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom style={{color: 'black'}}>
                                Precio Total de {ultimoMes}
                                <br></br>
                                {props.ultimoMesValue}$
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div class="col-md-4" >
                    <Card >
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom style={{color: 'black'}}>
                                Ganancias/Perdidas
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                {profit.estilo == 'positivo' ? <p style={{color:'green'}}>{profit.cantidad}%</p>: <p style={{color:'red'}}>{profit.cantidad}%</p>}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }