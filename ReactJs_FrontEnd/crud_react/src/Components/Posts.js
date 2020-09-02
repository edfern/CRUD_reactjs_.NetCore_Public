import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'

function Posts() {

  const baseUrl="https://localhost:44362/api/posts"
  const [data, setData] = useState([]);

  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalElimnar, setModalEliminar] = useState(false);

  const [gestorSeleccionado, setGestorSelecionado] = useState({
    id_puesto: '',
    puesto: ''
});

 //Metodo handleChange
 const handleChange = e =>{
    const {name,value} = e.target;
    setGestorSelecionado({
        ...gestorSeleccionado,
        [name]: value
    })
    console.log(gestorSeleccionado)
};

//Controladores de modales
const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
}
const abrirCerrarModalEditar=()=>{
  setModalEditar(!modalEditar);
}
const abrirCerrarModalEliminar=()=>{
  setModalEliminar(!modalElimnar);
}

//Metodo GET

  const peticionGet=async()=>{
    await axios.get(baseUrl).then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  };

   //Metodo Post axios
   const peticionPost=async()=>{
    delete gestorSeleccionado.id_puesto
    await axios.post(baseUrl, gestorSeleccionado).then(response=>{
    setData(data.concat(response.data));
    abrirCerrarModalInsertar();
  }).catch(error=>{
    console.log(error);
  })
};

//Metodo Put axios
const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+gestorSeleccionado.id_puesto, gestorSeleccionado).then(response=>{
        var respuesta = response.data;
        var dataAuxiliar = data;
        dataAuxiliar.map(gestor => {
            if(gestor.id===gestorSeleccionado.id_puesto){
                gestor.puesto = respuesta.puesto;
            }
        })
        setData(response.data);
    abrirCerrarModalEditar();
  }).catch(error=>{
    console.log(error);
  })
  };

  //Metodo delete axios
const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+gestorSeleccionado.id_puesto).then(response=>{
        setData(data.filter(gestor=>gestor.id_puesto!==response.data));
        setData(response.data); 
    abrirCerrarModalEliminar();
  }).catch(error=>{
    console.log(error);
  })
  };

  const seleccionarGestor=(gestor, caso) =>{
    setGestorSelecionado(gestor);
    (caso==="Editar")?
    abrirCerrarModalEditar() :abrirCerrarModalEliminar();
  };



  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Puesto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(gestor =>(
            <tr key ={gestor.id_puesto} >
              <td>{gestor.id_puesto}</td>
              <td>{gestor.puesto}</td>
              <td>
                <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor,"Editar")}>Editar</button>{" "}
                <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor,"Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Add post</button>


      <Modal isOpen={modalInsertar}>
        <ModalHeader> Insert new post</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <lable>Codigo</lable>
                <br/>
                <input type="text" className="form-control" name="puesto" onChange={handleChange}/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPost()}>Add</button>{" "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancel</button>
        </ModalFooter>
    </Modal>

    <Modal isOpen={modalEditar}>
        <ModalHeader> Change employee</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <lable>ID</lable>
                <br/>
                <input type="text" className="form-control" name="id_puesto" onChange={handleChange} readOnly value={gestorSeleccionado && gestorSeleccionado.id_puesto}/>
                <lable>Codigo</lable>
                <br/>
                <input type="text" className="form-control" name="puesto" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.puesto}/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Change</button>{" "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancel</button>
        </ModalFooter>
    </Modal>

    <Modal isOpen={modalElimnar}>
        <ModalHeader>¿Seguro que quieres eliminar a {gestorSeleccionado && gestorSeleccionado.puesto} de tu lista de puestos? </ModalHeader>
        <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>
            <button className="btn btn-outline-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
    </Modal>
      
    </div>
  );
}

export default Posts;