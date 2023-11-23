import React, {useEffect, useState} from "react"
import {Button, Card, Form} from "react-bootstrap"
import Etat_de_stock from "./Etat_de_stock";
import axios from "axios";
const Form_etat_de_stock=()=>{

    const [formdata, setFormdata]=useState({
        dateDebut: "2023-11-20",
        dateFin: "2023-11-20",
        references: "S",
        magasin:{
            id:""
        }

    })

    const [magasin,setMagasin]=useState([])
    const [produits,setProduits]=useState([])
    const [etatDestock,setEtatDestock]=useState([])
    const [showEtat,setShowEtat]=useState(false)
    const [dateDebut , setDateDebut]=useState("")
    const [dateFin , setDateFin]=useState("")
    const [montantTotal, setMontantTotal]=useState(0)
    const formatDate=(datetime)=>{
        datetime.replace("T"," ")
    }
    useEffect(()=>
        {
            async function fetchDatas (){
                const mag= await axios.get("http://localhost:8080/api/magasin")
                const prod= await axios.get("http://localhost:8080/api/produit")
                setMagasin(mag.data)
                setProduits(prod.data)
            }
            fetchDatas()
        },[]
    )
    const  validerFormulaire =async ()=>{
        setFormdata({...formdata, dateFin: formatDateTime(new Date(formdata.dateFin)),dateDebut: formatDateTime(new Date(formdata.dateDebut))})
        console.log("huhu "+formdata)
        try{
            const etat= await axios.post("http://localhost:8080/api/EtatdeStock",formdata)
            setEtatDestock(etat.data)
            setShowEtat(true)
            console.log("==>> "+JSON.stringify(etatDestock))
        }catch (e){
            console.log(e)
        }

        // console.log("yooo la companie "+JSON.stringify(etat))
    }

    console.log(formdata)

    const showEtatDeStock=()=>{
        if (showEtat){
            return (<
                Card className="mb-5 p-5 shadow-sm">
                <Etat_de_stock etatDeStock={etatDestock} ></Etat_de_stock>
            </Card>)
        }
        return(
            <></>
        )
    }
    const formatDateTime = (dateTime) => {
        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, '0');
        const day = String(dateTime.getDate()).padStart(2, '0');
        const hours = String(dateTime.getHours()).padStart(2, '0');
        const minutes = String(dateTime.getMinutes()).padStart(2, '0');
        const seconds = String(dateTime.getSeconds()).padStart(2, '0');
        const milliseconds = String(dateTime.getMilliseconds()).padStart(3, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    };
    return (
        <>
        <Card className="mb-5 p-5 shadow-sm">
            <h1 className="h3">Formulaire d'Etat de stock </h1>

            <Form>
                <div className="row">
                    <Form.Group className="mb-3 col-6" controlId="formdate">
                        <Form.Label>date de sortie de stock</Form.Label>
                        <Form.Control type="datetime-local"  value={formdata.dateDebut}
                                      onChange={(e)=>{
                                          setFormdata({...formdata, dateDebut: (e.target.value)})
                                      }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 col-6" controlId="formdate2">
                        <Form.Label>date de sortie de stock</Form.Label>
                        <Form.Control type="datetime-local"  value={formdata.dateFin}
                                      onChange={(e)=>{
                                          setFormdata({...formdata, dateFin: (e.target.value)})

                                      }}
                        />
                    </Form.Group>
                </div>


                <Form.Group className="mb-3" controlId="formqtt">
                    <Form.Label>reference du produit</Form.Label>
                    <Form.Control type="text"  value={formdata.references}
                        onChange={(e)=>setFormdata({
                            ...formdata, references: e.target.value
                        })}
                    />
                </Form.Group>


                <Form.Group>
                    <Form.Label>Magasin</Form.Label>
                    <Form.Select aria-label="Default select example" value={formdata.magasin.id} onChange={(e)=>setFormdata({...formdata, magasin: {id: e.target.value}})}>
                        <option value="">tout les magasin</option>
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
            {showEtatDeStock()}

        </>
    )
}
export default Form_etat_de_stock