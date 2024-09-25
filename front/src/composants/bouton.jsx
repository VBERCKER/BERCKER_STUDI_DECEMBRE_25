import React from "react"; 

function Boutton(props){
    return(
        <button className="button1" value={props.value} onClick={props.click}>
       {props.btn}
        </button>

    )
}


export default Boutton;