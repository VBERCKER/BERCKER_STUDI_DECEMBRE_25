import React from "react";

function OfferCard(props){
    return (
        <div>
             <div className="myCard">
        <div className="innerCard">
            <div className="frontSide">
                <p className="title">{props.fronttitre}</p>
                <p className="police-p">{props.frontcontent}</p>
            </div>
            <div className="backSide">
                <p className="title">{props.backtitre}</p>
                <p className="police-p">{props.backcontent}</p>
            </div>
        </div>
    </div>
        </div>
    )
}

export default OfferCard;