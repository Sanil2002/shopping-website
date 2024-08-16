import { useAuth0 } from "@auth0/auth0-react";
import ButtonComponent from "../Utilities/ButtonComponent";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return ( 
    <div onClick={()=>loginWithRedirect()}>
    <ButtonComponent value="Login" />
    </div>
);};

export default LoginButton;