import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Form} from "react-bootstrap";
import axios from "axios";
// import Alert from "../../component/Alert/alert";

const Form_sortie_de_stock= ()=>{
    const [formdata, setFormdata]=useState({

        dateMouvementSortie: "",
        quantite_sortie: 1000,
        produit: {
            ref_produit: "SR001"

        },
        magasin: {
            id: 1
        },
        uniteEquivalence:{
            id:""
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
            dateMouvementSortie: "",
            quantite_sortie: 0,
            produit: {
                ref_produit: ""

            },
            magasin: {
                id: ""
            },
            uniteEquivalence:{
                id:""
            }
        })
    }

    // {
    //     "dateMouvementSortie": "2023-11-23 00:00:00",
    //     "quantite_sortie": 20,
    //     "produit": {
    //     "ref_produit": "SR002"
    //
    // },
    //     "magasin": {
    //     "id": 1
    // }
    // }


    const validationFormdata=()=>{
        if(formdata.dateMouvementSortie.isEmpty){
            setMessageErreur("date non valide")
        }
        if(formdata.quantite_sortie===0 || formdata.quantite_sortie<0){
            setMessageErreur("quantite "+formdata.quantite_sortie+" non valide")
        }
        // if(formdata.produit.ref_produit===""){
        //     setMessageErreur("veuillez selectionner un produit")
        //
        // }
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
    const formatDateTimes = (dateTime) => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        const milliseconds = String(dateTime.getMilliseconds()).padStart(3, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    };
    const  validerFormulaire =async ()=>{
        setFormdata({...formdata, dateMouvementSortie: formdata.dateMouvementSortie+"00:00:00" })
        console.log("huhu "+JSON.stringify(formdata))

        setMessageErreur("")

        if(validationFormdata()){
            try{
                const etat= await axios.post("http://localhost:8080/api/savemouvement",formdata)
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
        <h1>formulaire de sortie de stock </h1>
        {messageErreur && <Alert variant={"danger"}>{messageErreur}</Alert>}

        <Form>
            <Form.Group className="mb-3" controlId="formdate">
                <Form.Label>date de sortie de stock</Form.Label>
                <Form.Control type="date"  value={formdata.dateMouvementSortie}
                              onChange={(e)=>{
                                  setFormdata({...formdata, dateMouvementSortie: e.target.value})
                              }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formqtt">
                <Form.Label>quantite de sortie de stock</Form.Label>
                <Form.Control type="number"  value={formdata.quantite_sortie}
                              onChange={(e)=>setFormdata({
                                  ...formdata, quantite_sortie: e.target.value
                              })}
                />
            </Form.Group>



            <Form.Group>
                <Form.Label>produits en stock </Form.Label>
                <Form.Select aria-label="Default select example" value={formdata.produit.ref_produit} onChange={(e)=>setFormdata({...formdata, produit:{ref_produit: e.target.value} })}>
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
                <Form.Select aria-label="Default select example" value={formdata.uniteEquivalence.id} onChange={(e)=>setFormdata({...formdata, uniteEquivalence:{id: e.target.value} })}>
                    <option>unite</option>
                    {
                        equivalence?.map((prod,index)=>(
                            <option key={index} value={prod.id}>{prod.denom } :
                                {/*{prod.produit.ref_produit===null?null:prod.produit.ref_produit}*/}
                            </option>
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
export default Form_sortie_de_stock