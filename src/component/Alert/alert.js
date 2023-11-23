import React from 'react';

import PropTypes from "prop-types";
import {FaFire} from "react-icons/fa";
import {IoIosCheckmarkCircle} from "react-icons/io";

const Alert=({typeAlert, textes,position})=>{
  Alert.prototype={
    typeAlert:PropTypes.object.isRequired,
    textes:PropTypes.object.isRequired,
    position:PropTypes.object
  }
  return(

   <>
     {typeAlert===1?
     <Alert color={"danger"} className="d-flex align-items-center mt-2 mb-3">
       <FaFire size={24} color="red" />
       <div>{textes}</div>
     </Alert>
       : typeAlert===0?

       <Alert color="success" className="d-flex align-items-center">
         <IoIosCheckmarkCircle size={24} color="green" />
         <div>{textes}</div>
       </Alert>
         :
         <></>
     }
   </>

  )
}
export default Alert;
