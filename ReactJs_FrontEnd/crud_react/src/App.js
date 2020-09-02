import React, { useState, useEffect, Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import Employees from './Components/Employees'
import Customers from './Components/Customers'
import axios from 'axios';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Posts from './Components/Posts';

function App() {

  function getEmpleados() {
    ReactDOM.render(
      <React.StrictMode>
        <Employees />
      </React.StrictMode>,
      document.getElementById('btnTablas')
    );
  }
  function getClientes() {
    ReactDOM.render(
      <React.StrictMode>
        <Customers />
      </React.StrictMode>,
      document.getElementById('btnTablas')
    );
  }
  function getPuestos() {
    ReactDOM.render(
      <React.StrictMode>
        <Posts />
      </React.StrictMode>,
      document.getElementById('btnTablas')
    );
  }
  
  return (
    <div>
     <h3>Tablas</h3>
     <button type="button" onClick={getEmpleados} class="btn btn-outline-secondary">Empleados</button>
     <button type="button" onClick={getClientes} class="btn btn-outline-secondary">Clientes</button>
     <button type="button" onClick={getPuestos} class="btn btn-outline-secondary">Puestos</button>
   </div>
  );
}
export default App;
