import Button from "../../components/Button/buttons";
import Input from "../../components/Input/input";
import "./index.css";
import axios from "axios";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../Validations/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginIMT() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const onSubmit = (values) => {};

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
      onSubmit,
    });

  return (
    <>
      <div className="centralBody">
        <div className="centralCard">
          <div className="centralCardHeader">
            <h1>Login</h1>
          </div>
          <div className="centralCardBody">
            <form className="centralCardBody_form">
              <div className="centralCardBody_inputs">
                <Input
                  id="username"
                  placeholder="Emailexemplo@imt.pt"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={(errors.username && touched.username) || error}
                  errorText={errors.username}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={(errors.password && touched.password) || error}
                  errorText={errors.password || error}
                />
              </div>
              <Button title="Entrar" />
            </form>
            <div className="centralCardBody_help">
              <p className="help_label">
                Precisa de ajuda? Carregue{" "}
                <span className="help_button" onClick={() =>{navigate("/login")}}>aqui</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginIMT;
