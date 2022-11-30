import { useEffect, useState } from "react";
import { Col, Container, Row, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Alerts from "./AlertComp";
const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  console.log(params.imdbID);
  const imdbID = params.imdbID;

  const navigate = useNavigate();

  const getMovieDetails = async () => {
    try {
      let response = await fetch(
        `http://www.omdbapi.com/?i=${imdbID}&apikey=595fb9cf`
      );
      if (response.ok) {
        let data = await response.json();
        setTimeout(() => {
          setMovie(data);
          setIsLoading(false);
        }, 2000);
      } else {
        console.log("There was a problem fetching data");
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovieDetails(imdbID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="mt-4 mb-5 pb-5">
      {movie === [] && <NotFound />}

      <Row className="d-flex justify-content-center align-content-center text-center">
        <Col xs={12} md={6}>
          <Card bg="secondary" className="align-items-center">
            <Card.Img
              style={{ width: "19rem" }}
              variant="top"
              src={movie.Poster}
              className="mt-2"
            />
            <Card.Body>
              {isError && <Alerts />}
              {isLoading && (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>
                {movie.Released}
                <br></br>
                {movie.Runtime}
                <br></br>
                {movie.Plot}
              </Card.Text>
              <Button variant="outline-info" onClick={() => navigate(-1)}>
                Go back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
