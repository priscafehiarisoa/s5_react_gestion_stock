import React, {useEffect, useState} from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
const Sortie_de_stock=()=>{

    const [sorties,setSorties]=useState([])
    useEffect(()=>{
        async function getSorties(){
           try {
               const resp = await axios.get("http://localhost:8080/api/sortie")
               setSorties(resp.data)
           }catch (e) {
               console.log("erreur")
           }

        }
        getSorties()
    },[sorties])
    return (
        <>
            <h1>sortie_de_stock</h1>
            <Table className="mt-5">
                <tr>
                    <td><span className="fw-bold">date de sortie de stock :</span> </td>
                    
                </tr>
            </Table>

        <Table striped bordered hover>
            <thead>
                <tr>
                <th>mouvement de sorties</th>
                <th>idStock</th>
                <th>reference produit</th>
                <th>quantite sortie du stock</th>
                <th>quantite total sortie pour une action </th>
                <th>date Sortie </th>
                <th>id Magasin</th>
                </tr>
            </thead>
            <tbody>
            {
                sorties?.map((sorti,index)=>(
                    <tr key={index}>
                        <td>{sorti.idMouvementSortie}</td>
                        <td>{sorti.idStock}</td>
                        <td>{sorti.refProduit}</td>
                        <td>{sorti.quantiteSortieStock}</td>
                        <td>{sorti.quantiteSortie}</td>
                        <td>{sorti.dateSortie}</td>
                        <td>{sorti.idMagasin}</td>
                    </tr>
                ))
            }

                <tr>
                <th colSpan={3}>total montant:</th>
                <td>montant total</td>
                </tr>
            </tbody>
        </Table>
        </>
    )
}
export default Sortie_de_stock