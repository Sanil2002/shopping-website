import { useAuth0 } from "@auth0/auth0-react";
import ButtonComponent from "../Utilities/ButtonComponent";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <ButtonComponent value="Logout" />
    </div>
  );
};

export default LogoutButton;