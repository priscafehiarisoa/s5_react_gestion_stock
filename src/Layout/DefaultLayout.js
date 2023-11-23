import React from "react"
import NavBars from "../component/NavBars"
import AppContent from "../component/AppContent"
const DefaultLayout =()=>{
    return (
        <div className='container'>
            <NavBars></NavBars>
            <AppContent></AppContent>
        </div>
    )
}
export default DefaultLayout