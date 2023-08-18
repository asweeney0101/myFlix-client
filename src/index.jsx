import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";


import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
   
      <Container style={{ padding: "20px", marginTop: "20px" }}>
        <MainView />
      </Container>
    
  );
};


const root = createRoot(document.querySelector("#root"));
root.render(
<BrowserRouter>
 <App />
 </BrowserRouter>
);



