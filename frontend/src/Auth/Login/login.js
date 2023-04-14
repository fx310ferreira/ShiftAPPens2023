import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/buttons";
import "./index.css";

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <div className="centralBody">
        <div className="centralCard">
          <div className="centralCardHeader">
            <h1>Login</h1>
          </div>
          <div className="centralCardBody">
            <div className="centralCardBody_buttons">
              <Button title="Escola" onClick={() => {navigate("/login/imt");}}/>
              <Button title="Instituto" onClick={() => {navigate("/login/imt");}}/>
            </div>
            <div className="centralCardBody_help">
              <p className="help_label">Precisa de ajuda ? Carregue <span className="help_button">aqui</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
