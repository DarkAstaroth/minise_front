import React, { useContext, useEffect, useState } from "react";
import usuarioContext from "../../../context/usuarios/usuarioContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  borrarUsuarioAction,
  obtenerUsuarioEditar,
  obtenerUsuariosAction,
} from "../../actions/userActions";

const DataTableUsers = ({ campos }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  // Obtener el state
  const usuarios = useSelector((state) => state.usuarios.usuarios);
  const error = useSelector((state) => state.usuarios.error);
  const loading = useSelector((state) => state.usuarios.loading);

  useEffect(() => {
    const cargarUsuarios = () => dispatch(obtenerUsuariosAction());
    cargarUsuarios();
    // eslint-disable-next-line
  }, []);

  const handleRedirect = (id) => {
    //dispatch y redireccionar
    dispatch(obtenerUsuarioEditar(id));
    history(`/usuarios/${id}`);
  };

  // const usuariosContext = useContext(usuarioContext);
  // const { usuarios, obtenerUsuarios, eliminarUsuario } = usuariosContext;

  // const [dataTable, setDataTable] = useState([]);

  // useEffect(() => {
  //   // const loadData = async () => {
  //   //   await obtenerUsuarios();
  //   //   console.log("cargando");
  //   // };
  //   // loadData();
  // }, []);

  // if (!usuarios || !dataTable) return <p>Cargando...</p>;

  // const handleChange = (e) => {
  //   const params = e.target.value;
  //   if (params !== "") {
  //     const resultado = dataTable.filter((item) => {
  //       if (
  //         item.data.displayName
  //           .toString()
  //           .toLowerCase()
  //           .includes(params.toLowerCase()) ||
  //         item.data.email
  //           .toString()
  //           .toLowerCase()
  //           .includes(params.toLowerCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //     setDataTable(resultado);
  //   } else {
  //     setDataTable(usuarios);
  //   }
  // };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarUsuarioAction(id));
      }
    });
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="box box-solid box-primary">
          <div className="box-body">
            <div className="row">
              <div className="col-sm-12 col-lg-3">
                <span>Buscar: </span>
                <input
                  type="text"
                  className="form-control"
                  name="params"
                  placeholder="Nombre, Email"
                  // onChange={handleChange}
                />
              </div>
            </div>
            <div className="table-responsive">
              <table id="" className="table table-bordered table-striped">
                <thead>
                  <tr>
                    {campos.map((item) => (
                      <th key={item}>{item}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {usuarios.lenght != 0 ? (
                    usuarios.map((item) => (
                      <tr key={item.id}>
                        <td>{item.data.displayName}</td>
                        <td>{item.data.email}</td>
                        <td>{item.role.label}</td>
                        <td>
                          <span className="badge badge-success">Activo</span>
                        </td>
                        <td>
                          <button
                            className="btn btn-info btn-xs"
                            onClick={() => handleRedirect(item.id)}
                          >
                            <i className="fa fa-pencil"> </i> Editar
                          </button>{" "}
                          <button
                            className="btn btn-danger btn-xs"
                            onClick={() => handleDelete(item.id)}
                          >
                            <i className="fa fa-trash"></i> Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <h5>No hay Datos</h5>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTableUsers;
