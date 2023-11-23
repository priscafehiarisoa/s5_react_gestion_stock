import React from "react"
import { Table } from "react-bootstrap"
import PropTypes from "prop-types";
const Etat_de_stock=({etatDeStock})=>{
    Etat_de_stock.prototype={
        etatDeStock:PropTypes.object
    }
    return (
        <>
        <h1>Etat de stock </h1>
        <Table  className="mt-5">
                <tr>
                    <td><span className="fw-bold">date debut : {etatDeStock.dateDebut}</span> </td>
                    <td><span className="fw-bold">date fin : {etatDeStock.dateFin}</span> </td>
                </tr>
            </Table>

        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Reference du produit</th>
                <th>Stock initiale</th>
                <th>Stock finale</th>
                <th>sortie de stock</th>
                <th>PUMP</th>
                <th>magasin</th>
                <th>montant</th>
                </tr>
            </thead>
            <tbody>
            {
                etatDeStock.detailEtatDeStocks?.map((etat,index)=>(
                    <tr key={index}>
                        <td>{etat.produit.ref_produit}</td>
                        <td>{etat.stockInitiale} </td>
                        <td>{etat.stockFinale} </td>
                        <td>{etat.sortie_Stock} </td>
                        <td>{etat.prixUnitaireMoyen}</td>
                        <td>{etat.magasin.nom_magasin?etat.magasin.nom_magasin:""}</td>
                        <td>{etat.montant}</td>
                    </tr>
                ))

            }

                <tr>
                    <th colSpan={6}>total montant:</th>
                    <th>{etatDeStock.montantTotal}</th>
                </tr>
            </tbody>
        </Table>
        </>
    )

}
export default Etat_de_stock