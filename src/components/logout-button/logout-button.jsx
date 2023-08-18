import { Button} from "react-bootstrap";

export const LogoutButton = ({ setUser, setToken }) => {
 
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    location.replace('/');
  }

  return (
   <>
     <Button onClick={logout}>Logout</Button>  
   </>
  );
};
