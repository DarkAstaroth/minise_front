import React, { useContext, useEffect, useState } from "react";
import usuarioContext from "../../../context/usuarios/usuarioContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const DataTableUsers = ({ campos }) => {
  const usuariosContext = useContext(usuarioContext);
  const { usuarios, obtenerUsuarios, eliminarUsuario } = usuariosContext;

  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await obtenerUsuarios();
      console.log('cargando')
    };
    loadData();
  }, []);

  if (!usuarios || !dataTable) return <p>Cargando...</p>;

  const handleChange = (e) => {
    const params = e.target.value;
    if (params !== "") {
      const resultado = dataTable.filter((item) => {
        if (
          item.data.displayName
            .toString()
            .toLowerCase()
            .includes(params.toLowerCase()) ||
          item.data.email
            .toString()
            .toLowerCase()
            .includes(params.toLowerCase())
        ) {
          return item;
        }
      });
      setDataTable(resultado);
    } else {
      setDataTable(usuarios);
    }
  };

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
        eliminarUsuario(id);
        Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
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
                  onChange={handleChange}
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
                  {dataTable.length != 0 ? (
                    dataTable.map((item) => (
                      <tr key={item.id}>
                        <td>{item.data.displayName}</td>
                        <td>{item.data.email}</td>
                        <td>{item.role}</td>
                        <td>
                          <span className="badge badge-success">Activo</span>
                        </td>
                        <td>
                          <Link to={`/usuarios/${item.id}`}>
                            <button className="btn btn-info btn-xs">
                              <i className="fa fa-pencil"> </i> Editar
                            </button>{" "}
                          </Link>

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
