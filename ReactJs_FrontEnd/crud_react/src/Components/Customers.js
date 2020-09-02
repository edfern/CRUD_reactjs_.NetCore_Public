import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'

function Customers() {

  const baseUrl="https://localhost:44362/api/customers"
  const [data, setData] = useState([]);

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalElimnar, setModalEliminar] = useState(false);


  const [gestorSeleccionado, setGestorSelecionado] = useState({
      id_cliente: '',
      nit: '',
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: '',
      fecha_nacimiento: ''
  })
  const handleChange = e =>{
      const {name,value} = e.target;
      setGestorSelecionado({
          ...gestorSeleccionado,
          [name]: value
      })
      console.log(gestorSeleccionado)
  }

  const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
  }
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalElimnar);
  }

  //Metodo Get axios
  const peticionGet=async()=>{
    await axios.get(baseUrl).then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  

  //Metodo Post axios
  const peticionPost=async()=>{
      delete gestorSeleccionado.id_cliente
      await axios.post(baseUrl, gestorSeleccionado).then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  //Metodo Put axios
  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+gestorSeleccionado.id_cliente, gestorSeleccionado).then(response=>{
        var respuesta = response.data;
        var dataAuxiliar = data;
        dataAuxiliar.map(gestor => {
            if(gestor.id===gestorSeleccionado.id_cliente){
                gestor.nombres = respuesta.nombres;
                gestor.apellidos = respuesta.apellidos;
                gestor.direccion = respuesta.direccion;
                gestor.telefono = respuesta.telefono;
                gestor.fecha_nacimiento = respuesta.fecha_nacimiento;
            }
        })
        setData(response.data);
    abrirCerrarModalEditar();
  }).catch(error=>{
    console.log(error);
  })
}

    //Metodo delete axios
    const peticionDelete=async()=>{
        await axios.delete(baseUrl+"/"+gestorSeleccionado.id_cliente).then(response=>{
            setData(data.filter(gestor=>gestor.id_cliente!==response.data));
            setData(response.data); 
        abrirCerrarModalEliminar();
      }).catch(error=>{
        console.log(error);
      })
    }

  const seleccionarGestor=(gestor, caso) =>{
      setGestorSelecionado(gestor);
      (caso==="Editar")?
      abrirCerrarModalEditar() :abrirCerrarModalEliminar();
  }
  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>NIT</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Fecha Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(gestor =>(
            <tr key ={gestor.id_cliente} >
              <td>{gestor.id_cliente}</td>
              <td>{gestor.nit}</td>
              <td>{gestor.nombres}</td>
              <td>{gestor.apellidos}</td>
              <td>{gestor.direccion}</td>
              <td>{gestor.telefono}</td>
              <td>{gestor.fecha_nacimiento}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor,"Editar")}>Edit</button>{" "}
                <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor,"Eliminar")}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Add Customer</button>
      
      
      <Modal isOpen={modalInsertar}>
        <ModalHeader> Insert new Customer</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <lable>Nit</lable>
                <br/>
                <input type="text" className="form-control" name="nit" onChange={handleChange}/>
                <lable>Nombres</lable>
                <br/>
                <input type="text" className="form-control" name="nombres" onChange={handleChange}/>
                <lable>Apellidos</lable>
                <br/>
                <input type="text" className="form-control" name="apellidos" onChange={handleChange}/>
                <lable>Direccion</lable>
                <br/>
                <input type="text" className="form-control" name="direccion" onChange={handleChange}/>
                <lable>Telefono</lable>
                <br/>
                <input type="text" className="form-control" name="telefono" onChange={handleChange}/>
                <lable>Fecha nacimiento</lable>
                <br/>
                <input type="date" className="form-control" name="fecha_nacimiento" onChange={handleChange}/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Add</button>{" "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancel</button>
        </ModalFooter>
    </Modal>

    <Modal isOpen={modalEditar}>
        <ModalHeader> Change Customer</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <lable>ID</lable>
                <br/>
                <input type="text" className="form-control" name="id_cliente" onChange={handleChange} readOnly value={gestorSeleccionado && gestorSeleccionado.id_cliente}/>
                <lable>Nit</lable>
                <br/>
                <input type="text" className="form-control" name="nit" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.nit}/>
                <lable>Nombres</lable>
                <br/>
                <input type="text" className="form-control" name="nombres" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.nombres}/>
                <lable>Apellidos</lable>
                <br/>
                <input type="text" className="form-control" name="apellidos" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.apellidos}/>
                <lable>Direccion</lable>
                <br/>
                <input type="text" className="form-control" name="direccion" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.direccion}/>
                <lable>Telefono</lable>
                <br/>
                <input type="text" className="form-control" name="telefono" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.telefono}/>
                <lable>Fecha nacimiento</lable>
                <br/>
                <input type="date" className="form-control" name="fecha_nacimiento" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.fecha_nacimiento}/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Change</button>{" "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancel</button>
        </ModalFooter>
    </Modal>

    <Modal isOpen={modalElimnar}>
        <ModalHeader>¿Seguro que quieres eliminar a {gestorSeleccionado && gestorSeleccionado.nombres} de tu lista de clientes? </ModalHeader>
        <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>
            <button className="btn btn-outline-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
    </Modal>
    </div>
  );
}

export default Customers;
