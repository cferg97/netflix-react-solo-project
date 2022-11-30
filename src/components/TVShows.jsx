import MovieGallery from "./MovieGallery";
import { Container, DropdownButton } from "react-bootstrap"

const TVShows = () => {
  return (
    <>
      <Container className="mr-2 ml-2 mt-4 mb-5 d-flex flex-row">
        <h5 className="text-light">TV Shows</h5>
        <DropdownButton
          title="Animation"
          variant="outline-secondary"
          className="genre-button d-flex"
        />
      </Container>

      <MovieGallery query="Futurama" />
      <MovieGallery query="The Simpsons" />
      <MovieGallery query="Family Guy" />
    </>
  );
};

export default TVShows;
