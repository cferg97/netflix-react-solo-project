import "./Styles.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Container, Row, Col } from "react-bootstrap"
import Navigation from "./components/NavBar";
import Gallery1 from "./Gallery1";
import NetflixFooter from "./components/Footer";

function App() {
  return (
    <div className="App d-flex flex-column">
      <Navigation />
      <Container fluid className="d-flex flex-column">
      <Gallery1 title="Trending Series"/>
      <Gallery1 title="Trending Movies" />
      <Gallery1 title="Most Popular All Time" />

      </Container>
      <NetflixFooter className="bottom-fixed"/>
    </div>
  );
}

export default App;
