import React, {useEffect, useState} from "react";
import axios from "axios";
import {Alert, Button, Card, Form} from "react-bootstrap";

const EntreStock=()=>{
    const [formdata, setFormdata]=useState({
        ref_produit: "SR001",
        dateEntreStock: "2023-11-23 00:00:00",
        quantite_Entree: 1000,
        prix_unitaire: 100,
        magasin: {
        id: 1
    },
        uniteEquivalence: {
        id: 2,
            produit: {

        }
        }

    })
    const [magasin,setMagasin]=useState([])
    const [produits,setProduits]=useState([])
    const [messageErreur, setMessageErreur]=useState("")
    const [equivalence,setEquivalence]=useState([])
    const [lastDate,setLastDate]=useState([])

    useEffect(()=>
        {
            async function fetchDatas (){
                const mag= await axios.get("http://localhost:8080/api/magasin")
                const prod= await axios.get("http://localhost:8080/api/produit")
                const eq=await axios.get("http://localhost:8080/api/unite")
                setMagasin(mag.data)
                setProduits(prod.data)
                setEquivalence(eq.data)
            }
            fetchDatas()
        },[]
    )

    const reserFormdata=()=>{
        setFormdata({
            ref_produit: "",
            dateEntreStock: "",
            quantite_Entree: 10,
            prix_unitaire: 100,
            magasin: {
                id: 1
            },
            uniteEquivalence: {
                id: 2,

            }
        })
    }


    const validationFormdata=()=>{
        // if(formdata.dateMouvementSortie.isEmpty){
        //     setMessageErreur("date non valide")
        // }
        if(formdata.quantite_sortie===0 || formdata.quantite_sortie<0){
            setMessageErreur("quantite "+formdata.quantite_sortie+" non valide")
        }
        if(formdata.ref_produit===""){
            setMessageErreur("veuillez selectionner un produit")

        }
        if(formdata.ref_produit==='T001' && formdata.uniteEquivalence.id!==1){
            setMessageErreur("les quivalences ne correspondent pas ")
        }else if (formdata.ref_produit==='F003' && formdata.uniteEquivalence.id!==3){
            setMessageErreur("les quivalences ne correspondent pas ")
        }
        else if (formdata.ref_produit==='B002' && formdata.uniteEquivalence.id!==2){
            setMessageErreur("les quivalences ne correspondent pas ")
        }
        if(formdata.magasin.id.isEmpty){
            setMessageErreur("[veuillez selectionner un magasin]")
        }
        if(messageErreur){
            return false
        }
        return true
    }
    const formatDate=(datetime)=>{
        datetime.replace("T"," ")
    }

    const  validerFormulaire =async ()=>{
        setFormdata({...formdata, dateEntreStock: formdata.dateEntreStock+"00:00:00" })
        console.log("huhu "+JSON.stringify(formdata))

        setMessageErreur("")

        if(validationFormdata()){
            try{
                const etat= await axios.post("http://localhost:8080/api/saveStock",formdata)
                if(etat.data.message){
                    console.log(etat.data.message())
                }
                reserFormdata()
            }catch (error) {
                if (error.response) {
                    setMessageErreur(error.response.data.message);
                } else if (error.request) {
                    console.log("cas2")
                    setMessageErreur('No response received');
                } else {
                    console.log("cas3")
                    console.error('Error:', error.message);
                    setMessageErreur(error.message);
                }
            }
        }
        console.log(messageErreur)
    }
    return (
        <>
            <Card className="mb-5 p-5 shadow-sm">
                <h1>formulaire d'entré de stock </h1>
                {messageErreur && <Alert variant={"danger"}>{messageErreur}</Alert>}

                <Form>
                    <Form.Group className="mb-3" controlId="formdate">
                        <Form.Label>date de entree de stock</Form.Label>
                        <Form.Control type="date"  value={formdata.dateEntreStock}
                                      onChange={(e)=>{
                                          setFormdata({...formdata, dateEntreStock: e.target.value})
                                      }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formqtt">
                        <Form.Label>quantite de sortie de stock</Form.Label>
                        <Form.Control type="number"  value={formdata.quantite_Entree}
                                      onChange={(e)=>setFormdata({
                                          ...formdata, quantite_Entree: e.target.value
                                      })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formqtt">
                        <Form.Label>prix unitaire</Form.Label>
                        <Form.Control type="number"  value={formdata.prix_unitaire}
                                      onChange={(e)=>setFormdata({
                                          ...formdata, prix_unitaire: e.target.value
                                      })}
                        />
                    </Form.Group>



                    <Form.Group>
                        <Form.Label>produits en stock </Form.Label>
                        <Form.Select aria-label="Default select example" value={formdata.ref_produit} onChange={(e)=>setFormdata({...formdata, ref_produit: e.target.value })}>
                            <option>produits</option>
                            {
                                produits?.map((prod,index)=>(
                                    <option key={index} value={prod.ref_produit}>{prod.ref_produit}</option>
                                ))
                            }

                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>unite d'equivalence </Form.Label>
                        <Form.Select aria-label="Default select example" value={
                            formdata.uniteEquivalence.id} onChange={(e)=>{setFormdata({...formdata, uniteEquivalence:{id: e.target.value} })
                            console.log("unite "+JSON.stringify(formdata.uniteEquivalence))
                            }

                        }>
                            <option>unite</option>
                            {
                                equivalence?.map((prod,index)=>(
                                    <option key={index} value={prod.id}>{prod.denom } : {prod.produit.ref_produit}</option>
                                ))
                            }

                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Magasin</Form.Label>
                        <Form.Select aria-label="Default select example" value={formdata.magasin.id} onChange={(e)=>setFormdata({...formdata, magasin: {id: e.target.value}})}>
                            <option>magasin</option>
                            {
                                magasin?.map((prod,index)=>(
                                    <option key={index} value={prod.id}>{prod.nom_magasin}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>

                    <Button className="mt-5 col-12" onClick={validerFormulaire}>valider</Button>
                </Form>
            </Card>
        </>
    )
}
export default EntreStock