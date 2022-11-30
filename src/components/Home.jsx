import MovieGallery from "./MovieGallery";
import { Container, DropdownButton } from "react-bootstrap"

const Home = (props) => {
  return (
    <>
      <Container className="mr-2 ml-2 mt-4 mb-5 d-flex flex-row">
        <h5 className="text-light">Based on your recent history</h5>
        <DropdownButton
          title="Genres"
          variant="outline-secondary"
          className="genre-button d-flex"
        />
      </Container>
      <MovieGallery query="Sonic The Hedgehog" />
      <MovieGallery query="Harry Potter" />
      <MovieGallery query="Avatar" />
    </>
  );
};

export default Home;
