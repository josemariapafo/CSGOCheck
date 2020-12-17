import React from 'react';
import ListaInventario from './ListaInventario';

export default function Inventario(props){

        return (
                <div style={{marginLeft:'15%',marginRight:'15%'}}>
                        <h1>Inventario Actual de {props.usuario}</h1>
                        <ListaInventario inventario = {props.inventario}/>
                </div>
        );
}