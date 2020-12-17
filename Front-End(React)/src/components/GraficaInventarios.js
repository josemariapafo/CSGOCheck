import React from 'react'
import Chart from "react-apexcharts";

  export default function GraficaInventarios(props){
       
    if(!props.datos)
      return null;

    var data = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: props.datos.fechas
          }
        },
        series: [
          {
            name: "Mes",
            data: props.datos.cantidadesTotales
          }
        ]
      };
      
    
    return(
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            width="500"
          />
        </div>
      </div>
    )
}