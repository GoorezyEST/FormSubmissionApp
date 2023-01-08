import React, { useState } from "react";
import useFirebase from "../firebase";
import template from "../form-template.json";
import "./Form.css";
import { Link } from "react-router-dom";
import { HiCalendar, HiGlobeAlt, HiUser, HiMail } from "react-icons/hi";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const [loader, setLoader] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [shippingReady, setShippingReady] = useState(false);

  const firebase = useFirebase();

  const submittedForm = async (data) => {
    setLoader(true);

    await firebase
      .addData(data.name, data.email, data.birthdate, data.nationality)
      .then(() => {
        setLoader(false);
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    document.querySelector(".termsInput").checked = null;
    reset({
      name: "",
      email: "",
      birthdate: "",
      nationality: "",
    });
    setSubmitted(true);
    setShippingReady(true);
  };

  return (
    <form className="form" onSubmit={handleSubmit(submittedForm)}>
      <h1>
        {window.matchMedia("(min-width: 610px)").matches
          ? "GreyDive - Challenge"
          : "GreyDive"}
      </h1>

      <div className="inputText">
        <label>{template.items[0].label}</label>
        <div className="inputContainer">
          <HiUser className="icon" />
          <input
            type={template.items[0].type}
            name={template.items[0].name}
            placeholder="Nombre..."
            {...register("name", {
              required: template.items[0].required,
              maxLength: 40,
            })}
          />
        </div>
        {errors.name?.type === "required" && (
          <p className="error_text">Este campo es requerido.</p>
        )}
        {errors.name?.type === "maxLength" && (
          <p className="error_text">
            El nombre no puede contener mas de 40 caracteres.
          </p>
        )}
      </div>

      <div className="inputText">
        <label>{template.items[1].label}</label>
        <div className="inputContainer">
          <HiMail className="icon" />
          <input
            type={template.items[1].type}
            name={template.items[1].name}
            placeholder="Correo ..."
            {...register("email", {
              required: template.items[1].required,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
        </div>
        {errors.email?.type === "required" && (
          <p className="error_text">Este campo es requerido.</p>
        )}
        {errors.email?.type === "pattern" && (
          <p className="error_text">El formato del email es invalido.</p>
        )}
      </div>

      <div className="inputText">
        <label>{template.items[2].label}</label>
        <div className="inputContainer">
          <HiCalendar className="icon" />
          <input
            className="inputDate"
            type={template.items[2].type}
            name={template.items[2].name}
            defaultValue="Enter your birth date"
            {...register("birthdate", {
              required: template.items[2].required,
              validate: (value) => {
                const currentYear = new Date().getFullYear();
                const year = new Date(value).getFullYear();
                return (
                  (currentYear - year >= 18 && currentYear - year <= 110) ||
                  "Invalid age"
                );
              },
            })}
          />
        </div>
        {errors.birthdate?.type === "required" && (
          <p className="error_text">Este campo es requerido.</p>
        )}
        {errors.birthdate?.type === "validate" && (
          <p className="error_text">Debes ser mayor de 18 años.</p>
        )}
      </div>

      <div className="selectContainer">
        <label>{template.items[3].label}</label>
        <div className="inputSelectContainer">
          <HiGlobeAlt className="icon" />
          <select
            className="selectInput"
            name={template.items[3].name}
            {...register("nationality", {
              required: template.items[3].required,
            })}
          >
            <option value="" className="options">
              Pais ...
            </option>
            {template.items[3].options.map((opt) => (
              <option key={opt.value} value={opt.value} className="options">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {errors.nationality?.type === "required" && (
          <p className="error_text">Este campo es requerido.</p>
        )}
      </div>

      <div className="termsContainer">
        <div className="termsContent">
          <input
            className="termsInput"
            type={template.items[4].type}
            name={template.items[4].name}
            {...register("checkbox", {
              required: template.items[4].required,
            })}
          />
          <label className="termsLabel">{template.items[4].label}</label>
        </div>
        {errors.checkbox?.type === "required" && (
          <p className="error_text">Este campo es requerido.</p>
        )}
      </div>
      <button
        type={template.items[5].type}
        className={loader ? "btn-loading" : "btn"}
        disabled={shippingReady}
      >
        {template.items[5].label}
      </button>
      <Link to="/answer" className="linkToAnswer">
        {submitted ? "Mira tus respuestas" : ""}
      </Link>
    </form>
  );
};

export default Form;
