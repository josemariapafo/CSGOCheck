import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button } from 'antd';

  export default function AjusteCuenta(props){

    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 8,
      },
    };

    const tailLayout = {
      wrapperCol: {
        offset: 4,
        span: 8,
      },
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    const  onFinishInventoryFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    
    function  onFinish(values){

      if(props.datosUsuario.usuario == values.usuario){
          fetch('http://localhost:4000/api/inversiones/cambio-contrasena', {
            method: 'POST',
            body: JSON.stringify({ usuario:values.usuario, contrasenaActual: values.contrasenaActual, contrasenaNueva: values.contrasenaNueva }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }) 
          .then(data => data.json())
          .then(data1 => {
            console.log(data1)
            if(data1 == "contrasenaActualCorrecta"){
              alert("!Contraseña Cambiada Con Éxito¡");
            }else if(data1 == "contrasenaActualIncorrecta"){
              alert("Contraseña Actual Incorrecta");
            }
          })
      }else{
        alert("¡Usuario Incorrecto!");
      }
    };

      function onFinishInventory(values){

        if(!isNaN(values.steamId)){
          fetch('http://localhost:4000/api/inversiones/cambio-steamId', {
            method: 'POST',
            body: JSON.stringify({ usuario: props.datosUsuario.usuario, steamId: values.steamId }),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              }
          }) 
          .then(data => data.json())
          .then(data1 => {
            if(data1.length != 0){
              alert("¡Realizado con Éxito, Reinicia la Web!");
            }else{
              console.log(data1);
              alert("¡Steam ID No Válido!");
            }
          })
        }else{
          alert("No has introducido ningún valor numérico");
        }
        if(!values.steamId){
          alert("Campo vacío");
        }
      }
  

      return(
        <div style={{marginLeft:'15%',marginRight:'15%'}}>
          <br></br>
          <h1 >Cambia la Contraseña de tu Cuenta</h1>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Usuario"
              name="usuario"
              rules={[
                {
                  required: true,
                  message: '¡Introduzca su Usuario!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña Actual"
              name="contrasenaActual"
              rules={[
                {
                  required: true,
                  message: '¡Introduzca la contraseña actual!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Contraseña Nueva"
              name="contrasenaNueva"
              rules={[
                {
                  required: true,
                  message: '¡Introduzca la contraseña nueva!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Actualizar Contraseña
              </Button>
            </Form.Item>
          </Form>
          <br></br>
          <h1>Actualiza Tu Inventario</h1>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishInventory}
            onFinishFailed={onFinishInventoryFailed}
          >
            <Form.Item
              label="Steam ID"
              name="steamId"
              rules={[
                {
                  required: true,
                  message: '¡Introduzca su Steam ID!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Actualizar  Steam ID
              </Button>
            </Form.Item>
          </Form>
        </div>
      )
  }