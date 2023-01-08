import { React, useEffect, useState } from "react";
import "./Answer.css";
import useFirebase from "../firebase";
import { Link } from "react-router-dom";
import { useUserId } from "../userIdContext";

function Answer() {
  const firebase = useFirebase();
  const { userId } = useUserId();
  const [data, setData] = useState(null);

  useEffect(() => {
    firebase.getData(userId).then((data) => setData(data));
  }, [userId, firebase]);

  if (!data) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="data_container">
      <div className="welcome">
        <p>Aqui puedes ver</p>
        <h1>Tu respuesta</h1>
      </div>
      <div className="data">
        <span>Nombre completo :</span>
        <p>{data.name}</p>
      </div>
      <div className="data">
        <span>Correo electronico :</span>
        <p>{data.email}</p>
      </div>
      <div className="data">
        <span>Fecha de nacimiento :</span>
        <p>{data.date}</p>
      </div>
      <div className="data">
        <span>Nacionalidad :</span>
        <p>{data.country.charAt(0).toUpperCase() + data.country.slice(1)}</p>
      </div>
      <div className="data_form">
        <Link to="../" className="linkToForm">
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default Answer;
