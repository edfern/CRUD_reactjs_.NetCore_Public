import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ReactDOM from 'react-dom';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'

function Employees(){
    const baseUrl="https://localhost:44362/api/employees"
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalElimnar, setModalEliminar] = useState(false);

    const [gestorSeleccionado, setGestorSelecionado] = useState({
      id_empleado: '',
      codigo: '',
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: '',
      id_puesto: '',
      fecha_nac: ''
  })

  //Metodo handleChange
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
  
    //Metodo GET
    const peticionGet=async()=>{
      await axios.get(baseUrl).then(response=>{
        setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
    }
    //Metodo Post axios
  const peticionPost=async()=>{
    delete gestorSeleccionado.id_empleado
    gestorSeleccionado.id_puesto = parseInt(gestorSeleccionado.id_puesto);
    await axios.post(baseUrl, gestorSeleccionado).then(response=>{
    setData(data.concat(response.data));
    abrirCerrarModalInsertar();
  }).catch(error=>{
    console.log(error);
  })
};

//Metodo Put axios
const peticionPut=async()=>{
  await axios.put(baseUrl+"/"+gestorSeleccionado.id_empleado, gestorSeleccionado).then(response=>{
      var respuesta = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(gestor => {
          if(gestor.id===gestorSeleccionado.id_empleado){
              gestor.codigo = respuesta.codigo;
              gestor.nombres = respuesta.nombres;
              gestor.apellidos = respuesta.apellidos;
              gestor.direccion = respuesta.direccion;
              gestor.telefono = respuesta.telefono;
              gestor.id_puesto = respuesta.id_puesto;
              gestor.fecha_nac = respuesta.fecha_nac;
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
  await axios.delete(baseUrl+"/"+gestorSeleccionado.id_empleado).then(response=>{
      setData(data.filter(gestor=>gestor.id_empleado!==response.data));
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
              <th>Codigo</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>id_puesto</th>
              <th>Fecha Nacimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(gestor =>(
              <tr key ={gestor.id_empleado} >
                <td>{gestor.id_empleado}</td>
                <td>{gestor.codigo}</td>
                <td>{gestor.nombres}</td>
                <td>{gestor.apellidos}</td>
                <td>{gestor.direccion}</td>
                <td>{gestor.telefono}</td>
                <td>{gestor.id_puesto}</td>
                <td>{gestor.fecha_nac}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>seleccionarGestor(gestor,"Editar")}>Editar</button>{" "}
                  <button className="btn btn-danger" onClick={()=>seleccionarGestor(gestor,"Eliminar")}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Add employee</button>


        <Modal isOpen={modalInsertar}>
        <ModalHeader> Insert new employee</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <lable>Codigo</lable>
                <br/>
                <input type="text" className="form-control" name="codigo" onChange={handleChange}/>
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
                <lable>id_puesto</lable>
                <br/>
                <input type="text" className="form-control" name="id_puesto" onChange={handleChange}/>
                <lable>Fecha nacimiento</lable>
                <br/>
                <input type="date" className="form-control" name="fecha_nac" onChange={handleChange}/>
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
                <input type="text" className="form-control" name="id_empleado" onChange={handleChange} readOnly value={gestorSeleccionado && gestorSeleccionado.id_empleado}/>
                <lable>Codigo</lable>
                <br/>
                <input type="text" className="form-control" name="codigo" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.codigo}/>
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
                <lable>id_puesto</lable>
                <br/>
                <input type="text" className="form-control" name="id_puesto" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.id_puesto}/>
                <lable>Fecha nacimiento</lable>
                <br/>
                <input type="date" className="form-control" name="fecha_nac" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.fecha_nac}/>
            </div>
        </ModalBody>
        <ModalFooter>
            <button className="btn btn-primary" onClick={()=>peticionPut()}>Change</button>{" "}
            <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancel</button>
        </ModalFooter>
    </Modal>

    <Modal isOpen={modalElimnar}>
        <ModalHeader>¿Seguro que quieres eliminar a {gestorSeleccionado && gestorSeleccionado.nombres} de tu lista de empleados? </ModalHeader>
        <ModalFooter>
            <button className="btn btn-danger" onClick={()=>peticionDelete()}>Si</button>
            <button className="btn btn-outline-secondary" onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
    </Modal>

        
      </div>
      
    );
}



export default Employees;