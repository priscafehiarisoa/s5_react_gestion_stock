import React from "react";
import Nav from 'react-bootstrap/Nav';

const NavBars =()=>{

    return (
        <Nav variant="tabs" defaultActiveKey="/home" className="m-5">
            <Nav.Item>
                <Nav.Link href="form_etatDeStock">Etat de stock </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" href="form_sortieDeStock"> sortie de stock </Nav.Link>
            </Nav.Item>
            {/*<Nav.Item>*/}
            {/*    <Nav.Link href="etatDeStock">Etat de stock t </Nav.Link>*/}
            {/*</Nav.Item>*/}
            {/*<Nav.Item>*/}
            {/*    <Nav.Link href="sortietDeStock">sortie de stock t</Nav.Link>*/}
            {/*</Nav.Item>*/}
            <Nav.Item>
                <Nav.Link href="mvvalide">mouvement valides</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="mvNonvalide">mouvement non validés</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="mvAttente">mouvement en attente de validation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="stock">entree stock</Nav.Link>
            </Nav.Item>
        
        </Nav>
    )
}
export default NavBars