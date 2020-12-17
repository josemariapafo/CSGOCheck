import React,{useEffect} from 'react';
import GraficaInventarios from './GraficaInventarios';
import Tarjetas_Grafica from './Tarjetas_Grafica';
import 'antd/dist/antd.css';
import { Select } from 'antd';

  const { Option } = Select;

  export default function ManejadorGrafica(props){

  const [datosGrafica, setDatosGrafica] = React.useState({});
  const [datosMostrar,setDatosMostrar] = React.useState(null);
  const [ primerMes,setPrimerMes] = React.useState("1");
  const [ ultimoMes,setUltimoMes] = React.useState("12");
  const [ primerMesValue,setPrimerMesValue ] = React.useState(0);
  const [ ultimoMesValue, setUltimoMesValue ] = React.useState(0);

useEffect(() => {

    var inventory = {fechas: ["0"],cantidadesTotales: [0]};

    if(props.datosGrafica){
      setDatosMostrar(props.datosGrafica);
      setPrimerMesValue(props.datosGrafica.cantidadesTotales[0]);
      setUltimoMesValue(props.datosGrafica.cantidadesTotales[11]);
    }else{
      fetch('http://localhost:4000/api/items/datosGrafica', {
            method: 'POST',
            body: JSON.stringify({ inventario:props.inventario}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
          }) 
          .then(data => data.json())
          .then(dat => {
              inventory.fechas = dat.fechas;
              inventory.cantidadesTotales = dat.cantidadesTotales;
              setDatosGrafica(inventory);
              setDatosMostrar(inventory);
              setPrimerMesValue(inventory.cantidadesTotales[0]);
              setUltimoMesValue(inventory.cantidadesTotales[11]);
          })
        }  
    }, []);

    function handleChange(checkedValues) { 

      var flag = false;
      checkedValues.map((value)=>{
        if(value=="todos"){
          flag = true;
        }
      })

      if(flag){
        setPrimerMes("1");
        setUltimoMes("12");
        setPrimerMesValue(datosGrafica.cantidadesTotales[0]);
        setUltimoMesValue(datosGrafica.cantidadesTotales[11]);
        setDatosMostrar(datosGrafica);
      }else{
        var datos = {fechas: ["3"],cantidadesTotales: [1]};
        var fechasCargar = [];
        var cantidadesTotalesCargar = [];
        checkedValues.map((value,j)=>{
          datosGrafica.fechas.map((fecha,i)=>{
            var fechaCortada = fecha.substring(0,fecha.indexOf("/"));
            //GUARDO EL PRIMER Y ULTIMO MES QUE HA SELECCIONADO EL USUARIO
            if(checkedValues.length == 1 && fechaCortada == value){
              setPrimerMes(fechaCortada);
              setUltimoMes(fechaCortada);
              setPrimerMesValue(datosGrafica.cantidadesTotales[i]);
              setUltimoMesValue(datosGrafica.cantidadesTotales[i]);
            }else if(j == 0 && fechaCortada == value){
              setPrimerMes(fechaCortada);
              setPrimerMesValue(datosGrafica.cantidadesTotales[i]);
            }else if(j == (checkedValues.length-1) && fechaCortada == value){
              setUltimoMes(fechaCortada);
              setUltimoMesValue(datosGrafica.cantidadesTotales[i]);
            }
            //Cogo todos los meses que coinciden con los meses elegidos
            if(fechaCortada == value){
              fechasCargar.push(fecha);
              cantidadesTotalesCargar.push(datosGrafica.cantidadesTotales[i]);
            }
          })
        })
        datos.fechas = fechasCargar;
        datos.cantidadesTotales = cantidadesTotalesCargar;
        setDatosMostrar(datos);
      }
    }


    return(
      <div style={{marginLeft:'15%',marginRight:'15%'}}>
          <br></br>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Selecciona los meses"
            defaultValue={['todos']}
            onChange={handleChange}
            optionLabelProp="label"
          >
            <Option value="todos" label="Todos los Meses">
              <div className="demo-option-label-item">
                Todos los Meses
              </div>
            </Option>
            <Option value="1" label="Enero">
              <div className="demo-option-label-item">
                Enero
              </div>
            </Option>
            <Option value="2" label="Febrero">
              <div className="demo-option-label-item">
                Febrero
              </div>
            </Option>
            <Option value="3" label="Marzo">
              <div className="demo-option-label-item">
                Marzo
              </div>
            </Option>
            <Option value="4" label="Abril">
              <div className="demo-option-label-item">
                Abril
              </div>
            </Option>
            <Option value="5" label="Mayo">
              <div className="demo-option-label-item">
              Mayo
              </div>
            </Option>
            <Option value="6" label="Junio">
              <div className="demo-option-label-item">  
              Junio
              </div>
            </Option>
            <Option value="7" label="Julio">
              <div className="demo-option-label-item">
                Julio
              </div>
            </Option>
            <Option value="8" label="Agosto">
              <div className="demo-option-label-item">
                Agosto
              </div>
            </Option>
            <Option value="9" label="Septiembre">
              <div className="demo-option-label-item">
                Septiembre
              </div>
            </Option>
            <Option value="10" label="Octubre">
              <div className="demo-option-label-item">
                Octubre
              </div>
            </Option>
            <Option value="11" label="Noviembre">
              <div className="demo-option-label-item">
                Noviembre
              </div>
            </Option>
            <Option value="12" label="Diciembre">
              <div className="demo-option-label-item">
                Diciembre
              </div>
            </Option>
          </Select>
          <h1>Mira Tu Margen De Ganancia</h1>
          <GraficaInventarios datos={datosMostrar}/>
          <Tarjetas_Grafica primerMes= {primerMes} ultimoMes={ultimoMes} primerMesValue={primerMesValue} ultimoMesValue={ultimoMesValue}/>
      </div>
    )
  }