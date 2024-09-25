import React from "react";

export function Table(props){

    return(<div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">JO24</th>
      <th scope="col">Sport</th>
      <th scope="col">Offre</th>
      <th scope="col">Places</th>
      <th scope="col">Prix</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">{props.image}</th>
      <td>{props.sport}</td>
      <td>{props.offre}</td>
      <td>{props.quantité}</td>
      <td>{props.prix}</td>
    </tr>
   
  </tbody>
</table>
    </div>)
}