import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import usuarioContext from "../../context/usuarios/usuarioContext";
import { Layout } from "../Layout/Layout";
import DataTableUsers from "../ui/users/DataTableUsers";

const Usuarios = () => {
    const campos = ["Nombre", "Email", "Rol", "Estado", "Acción"]
    return (
        <Layout>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Usuarios</h1>
                    <br />
                    <Link to={'/usuarios/new'} className="btn btn-primary mb-5">
                        <i className="fa fa-plus"></i> Crear Nuevo Usuario
                    </Link>

                </section>
                <div className="content">
                    <DataTableUsers campos={campos} />
                </div>
            </div>
        </Layout>
    );
};

export default Usuarios;
