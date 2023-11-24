import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Table} from "react-bootstrap";

const MvEnAttente=()=>{
    const [sorties,setSorties]=useState([])
    const [state,setState]=useState(0)
    useEffect(()=>{
        async function getSorties(){
            try {
                const resp = await axios.get("http://localhost:8080/api/mvtEnAttente")
                setSorties(resp.data)
            }catch (e) {
                console.log("erreur")
            }

        }
        getSorties()
    },[state])

    const  valider=async(id)=>{
        try{
            const etat= await axios.post(`http://localhost:8080/api/validerMouvement/${id}`)
            setState(state+1)
        }catch (e){
            console.log(e)
        }
    }
    return (
        <>
            <h1>mouvement En Attente</h1>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>mouvement de sorties</th>
                    <th>reference produit</th>
                    <th>quantite sortie du stock</th>
                    <th>date Sortie </th>
                    <th>id Magasin</th>
                    <th>sortie reel </th>
                    <th>-</th>
                    <th>-</th>
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
                            <td>{sorti.sortieReel}</td>
                            <td>
                                <Button variant="primary" onClick={()=>valider(sorti.id)} >valider</Button>
                            </td>
                            <td>
                                <Button variant="danger" >refuser</Button>
                            </td>
                        </tr>
                    ))
                }

                </tbody>
            </Table>
        </>
    )

}
export default MvEnAttente