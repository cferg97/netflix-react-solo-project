import "./Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from "react-bootstrap";
import Navigation from "./components/NavBar";
import Home from "./components/Home";
import TVShows from "./components/TVShows";
import NetflixFooter from "./components/Footer";
import MovieDetails from "./components/MovieDetails";
import NotFound from "./components/NotFound";

function App() {
  
  return (
    <div className="App d-flex flex-column">
      <BrowserRouter>
      <Navigation />
      <Container fluid className="d-flex flex-column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/tvshows" element={<TVShows />} />
          <Route path="/details/:imdbID" element={<MovieDetails />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Container>
      </BrowserRouter>
      <NetflixFooter className="bottom-fixed" />
    </div>
  );
}

export default App;
