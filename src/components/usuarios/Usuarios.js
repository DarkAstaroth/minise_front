import React, { useContext, useEffect } from "react";
import usuarioContext from "../../context/usuarios/usuarioContext";
import { Layout } from "../Layout/Layout";
import DataTable from "../ui/DataTable";

const Usuarios = () => {
    const usuariosContext = useContext(usuarioContext);
    const { usuarios, obtenerUsuarios } = usuariosContext;

    const campos = ["Nombre", "Email", "Rol", "Estado"]

    useEffect(() => {
        obtenerUsuarios();
    }, [])
    console.log(usuarios)

    return (
        <Layout>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Usuarios</h1>
                    <br />
                    <button type="button" class="btn btn-primary mb-5">
                        <i class="fa fa-plus"></i> Crear Nuevo Usuario
                    </button>

                </section>
                <div className="content">
                    <DataTable campos={campos} />
                </div>
            </div>
        </Layout>
    );
};

export default Usuarios;
