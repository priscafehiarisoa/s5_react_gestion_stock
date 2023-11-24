import {Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";

const MvValide=()=>{
    const [sorties,setSorties]=useState([])
    useEffect(()=>{
        async function getSorties(){
            try {
                const resp = await axios.get("http://localhost:8080/api/mvtValide")
                setSorties(resp.data)
            }catch (e) {
                console.log("erreur")
            }

        }
        getSorties()
    },[sorties])
    return (
        <>
            <h1>mouvement validé</h1>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>mouvement de sorties</th>
                    <th>reference produit</th>
                    <th>quantite sortie du stock</th>
                    <th>date Sortie </th>
                    <th>id Magasin</th>
                </tr>
                </thead>
                <tbody>
                {
                    sorties?.map((sorti,index)=>(
                        <tr key={index}>
                            <td>{sorti.id}</td>
                            <td>{sorti.produit.ref_produit}</td>
                            <td>{sorti.quantite_sortie}</td>
                            <td>{sorti.dateMouvementSortie}</td>
                            <td>{sorti.magasin.id}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </>
    )
}
export default MvValide