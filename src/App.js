import "./Styles.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Container, Row, Col } from "react-bootstrap"
import Navigation from "./components/NavBar";
import Gallery1 from "./Gallery1";
import MovieGallery from "./components/MovieGallery"
import NetflixFooter from "./components/Footer";

function App() {
  return (
    <div className="App d-flex flex-column">
      <Navigation />
      <Container fluid className="d-flex flex-column">

      <MovieGallery query="Harry Potter" />
      <MovieGallery query="Avatar" />
      <MovieGallery query="Star Wars" />
      <MovieGallery query="Sonic the Hedgehog" />

      </Container>
      <NetflixFooter className="bottom-fixed"/>
    </div>
  );
}

export default App;
