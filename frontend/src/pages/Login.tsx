import {useNavigate} from "react-router-dom";
import Button from "../components/Button.tsx";

export default function Login(){
    const navigate = useNavigate();

    return(
        <div>
            <h1>Login</h1>
            <label htmlFor="user">Usuário</label>
            <input type="text"/>
            <label htmlFor="password">Senha</label>
            <input type="password"/>
            <Button text="Entrar" onClick={() => navigate("/home")}/>
            <p>Não possui uma conta?</p>
            <button>Cadastrar-se</button>
        </div>
    )
}