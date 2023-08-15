import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import { Container } from "react-bootstrap";


import "bootstrap/dist/css/bootstrap.min.css";

import "./index.scss";

const App = () => {
  return (
   
      <Container style={{ padding: "20px", marginTop: "20px" }}>
        <MainView />
      </Container>
    
  );
};


const root = createRoot(document.querySelector("#root"));
root.render(<App />);



