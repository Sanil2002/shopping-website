import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import LogoutButton from "../Components/LogoutButtton";
import ButtonComponent from "../Utilities/ButtonComponent";
import { Commentbutton } from "../Components/Commentbutton";
import { Loading } from "../Utilities/Loading";
// import Update from "./Update";

const Profile = () => {
  const [isEmail,setisEmail] = useState(false);
  const { user, isAuthenticated, isLoading, error } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);
  }, [isLoading, isAuthenticated, user]);

  useEffect(() => {
    if(user?.email === "sanilm4637@gmail.com")
      setisEmail(true);
  })

  const handleNavigateToUpdate = () => {
    navigate('/Update');
  };

  const handleNavigateToStore = () => {
    navigate('/Store');
  };

  const handleNavigateToDashboard = () => {
    navigate('/Dashboard');
  }


  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (<div>
    {isAuthenticated && (<>
      <div className="pt-12">
      <div className="pl-32 pt-11  z-50"><Commentbutton /></div>
        <div className="h-screen flex flex-col items-center ">
        <svg className="absolute z-40 inset-35 fill-current w-full h-auto text-lime-200/40" viewBox="0 0 1440 450" xmlns="http://www.w3.org/2000/svg"><path d="M1189.2 169.2H421H253.8C159.8 169.2 69.1 203.1 0 262.6V449.8C30.5 349.9 131.3 276.7 252 276.7H424.1H1187.4C1280.9 276.7 1371 243.2 1440 184.3V0C1408.1 97.9 1308.3 169.2 1189.2 169.2Z"></path></svg>
        <div className="relative z-50 text-center justify-center space-y-4">
          <img src={user?.picture} alt={user?.name} className="rounded-full w-38 h-38 mb-4 mx-auto" />
          <h2 className="text-3xl font-bold mb-2">{user?.name}</h2>
          <p className="text-xl text-gray-700">{user?.email}</p>
        </div>
        <div className="flex z-50">
        <LogoutButton />
        { isEmail &&
         (<><ButtonComponent value="Dashboard" onClick={handleNavigateToDashboard} />
         <ButtonComponent value="Update" cl ="px-2" onClick={handleNavigateToUpdate} /></>)
        }
        <ButtonComponent value="Back" onClick={handleNavigateToStore} />
      </div>
      </div>
      </div>
    </>)}
    </div>
  );
};

export default Profile;
