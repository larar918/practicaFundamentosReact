import { login } from "./service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context";
import React, { useContext } from 'react';
import Layout from "../../components/Layout";

import '../../styles/components.css';
import '../../styles/forms.css';

function LoginPage() {

  const { onLogin } = useContext(AuthContext);
  const navigate= useNavigate();

  // Estados para controlar si el botón de submit está o no  
  const [credentials, setCredentials] = useState({
    email: '',
    password:'',
    rememberMe: ''
  });
  
  const handleSubmit = async event => {
    event.preventDefault();
    await login(credentials);
    onLogin();
    navigate('/adverts');
  }

  // Estados para controlar los valores de email, user y checked. Creamos una manejador general el cual va a modificar solo la propiedad de
  // credentials que genera el cambio de estado (email/password/checked). Le pisamos la propiedad.
  const handleChange = event => {
    setCredentials(currentCredentials => ({
      ...currentCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  // Constante para calcular en cada render (cada vez que se escribe un caracter en alguno de los inputs) si el botón tiene que seguir disabled
  const {email, password, checked} = credentials;
  const disabled = !(email && password); // si no hay email o contraseña su valor es true

  return (
    <Layout>
      <div className="page">
        <form onSubmit={ handleSubmit }>
          <fieldset>
              <label className="">Email: </label><input type="text" name="email" value = {email} onChange = {handleChange} className="formElement" /><br></br>
              <label>Contraseña: </label><input type="password" name="password" value = {password} onChange = {handleChange}  className="formElement"/><br></br>
              <div className="checkElement">
                <input type="checkbox" name ="rememberMe" checked = {checked} onChange = {handleChange} className="formCheck" /> <p className="formatCheckTarget">Remember me!</p>
              </div> 
          </fieldset>
          <button type="submit" disabled = {disabled} className="submit disabled" >Log In</button>
        </form>
      </div>
    </Layout>
  );
}

export default LoginPage;




