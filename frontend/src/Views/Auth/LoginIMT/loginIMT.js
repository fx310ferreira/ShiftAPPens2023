import Button from "../../../components/Button/buttons";
import Input from "../../../components/Input/input";
import "./index.css";
import axios from "axios";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../../Validations/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginIMT() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("acessToken")) {
      navigate("/calendar");
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = (values) => {
    axios.post(process.env.REACT_APP_API + "/login", values).then((response) => {
      localStorage.setItem(
        "acessToken",
        JSON.stringify(response.data.access)
      );
      navigate("/calendar");
    })
    .catch((error) => {
      setError("Wrong username or password");
    });
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        type: "imt"
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
            <form className="centralCardBody_form" onSubmit={handleSubmit}>
              <div className="centralCardBody_inputs">
                <Input
                  id="email"
                  placeholder="Emailexemplo@imt.pt"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={(errors.email && touched.email) || error}
                  errorText={errors.email}
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
              <Button title="Entrar" type="submit"/>
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
