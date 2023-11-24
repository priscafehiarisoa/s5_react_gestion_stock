import React, {useEffect, useState} from "react"
import { Table } from "react-bootstrap"
import PropTypes from "prop-types";
import axios from "axios";
const ListeStock=()=>{

    const [stock,setStock]=useState([])
    useEffect(()=>
        {
            async function fetchDatas (){
                const mag= await axios.get("http://localhost:8080/api/")
                setStock(mag.data)

            }
            fetchDatas()
        },[]
    )
    return (
        <>
            <h1>Etat de stock </h1>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Reference du produit</th>
                    <th>dateEntreStock</th>
                    <th>quantite_Entree</th>
                    <th>prix_unitaire</th>
                    <th>ref_produit</th>
                    <th>entreeproduitreel</th>
                    <th>entreeprixreel</th>
                </tr>
                </thead>
                <tbody>
                {
                    stock?.map((etat,index)=>(
                        <tr key={index}>
                            <td>{etat.ref_produit}</td>
                            <td>{etat.dateEntreStock} </td>
                            <td>{etat.quantite_Entree} </td>
                            <td>{etat.prix_unitaire} </td>
                            <td>{etat.ref_produit}</td>
                            <td>{etat.entreeproduitreel}</td>
                            <td>{etat.entreeprixreel}</td>
                            <td>{etat.uniteEquivalence?etat.uniteEquivalence.denom:"unite"}</td>
                        </tr>
                    ))

                }

                {/*<tr>*/}
                {/*    <th colSpan={6}>total montant:</th>*/}
                {/*    <th>{etatDeStock.montantTotal}</th>*/}
                {/*</tr>*/}
                </tbody>
            </Table>
        </>
    )

}
export default ListeStock