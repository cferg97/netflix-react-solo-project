import "./Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, DropdownButton, } from "react-bootstrap";
import Navigation from "./components/NavBar";
import MovieGallery from "./components/MovieGallery";
import NetflixFooter from "./components/Footer";

function App() {
  return (
    <div className="App d-flex flex-column">
      <Navigation />
      <Container fluid className="d-flex flex-column">
        <Container className="mr-2 ml-2 mt-4 mb-5 d-flex flex-row">
          <h5 className="text-light">TV Shows & Movies</h5>
          <DropdownButton title="Genres" variant="outline-secondary" className="genre-button d-flex"/>
        </Container>
        <MovieGallery query="Sonic the Hedgehog" />
        <MovieGallery query="Harry Potter" />
        <MovieGallery query="Lord of the Rings" />
        <MovieGallery query="The Simpsons" />
        <MovieGallery query="Star Wars" />
      </Container>
      <NetflixFooter className="bottom-fixed" />
    </div>
  );
}

export default App;
