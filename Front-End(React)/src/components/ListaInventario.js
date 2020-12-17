import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

  export default function ListaInventario(props){

    const columns = [
      { dataField: 'nombre', text: 'Nombre del Item'},
      { dataField: 'wear', text: 'Wear'},
      { dataField: 'cantidad', text: 'Cantidad'},
      { dataField: 'precioTotal', text: 'Precio Total'},
      { dataField: 'precioUnitario', text: 'Precio Unitario'},
    ];

    return (
      <div >
        <div className="ProductsTableComponent">
            <h4>Lista de items</h4>

                  <BootstrapTable
                    keyField='nombre'
                    data={props.inventario}
                    columns={columns}
                    bordered={false}
                    pagination={paginationFactory()}/>
        </div>
      </div>
    )
  }
