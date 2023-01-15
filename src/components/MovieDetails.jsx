import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Card,
  Button,
  Spinner,
  ListGroup,
  Form,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Alerts from "./AlertComp";
import { parseISO } from "date-fns";
import format from "date-fns/format";
import {
  addReviewAction,
  deleteReviewAction,
  getReviewsAction,
} from "../redux/actions";
import { useDispatch } from "react-redux";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [movie, setMovie] = useState([]);
  const reviews = useSelector((state) => state.reviews);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(1);
  const imdbID = params.imdbID;

  const reviewToSend = {
    rate: rate,
    comment: comment,
  };

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };

  const navigate = useNavigate();

  const getMovieDetails = async () => {
    try {
      let response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=595fb9cf`
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

  const onSubmitHandler = () => {
    setIsLoading(true);
    dispatch(addReviewAction(imdbID, reviewToSend));
    setRate(1);
    setComment("");
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const onDeleteHandler = (id) => {
    dispatch(deleteReviewAction(id));
  };

  useEffect(() => {
    getMovieDetails();
    dispatch(getReviewsAction(imdbID));
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
              <a
                href={`https://m2-soloproj-netflix-api-production.up.railway.app/media/${movie.imdbID}/pdf`}
              >
                <Button className="mr-2" variant="outline-success">
                  Generate PDF
                </Button>
              </a>
              <Button variant="outline-info" onClick={() => navigate(-1)}>
                Go back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-content-center text-center mt-5">
        <Col md={10}>
          <h2 className="text-white">Reviews</h2>
          {isLoading && (
            <Spinner className="my-auto" animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <Card bg="secondary" className="align-items-center">
            <ListGroup className="w-100 justify-items" variant="flush">
              {reviews &&
                reviews.map((r) => (
                  <ListGroup.Item
                    variant="secondary"
                    className="d-flex flex-column"
                  >
                    <Container>
                      Posted on{" "}
                      {format(parseISO(r.createdAt), "dd/MM/yyyy' at 'HH:mm")}
                    </Container>
                    {r.rate}/5
                    <br />
                    {r.comment}
                    <Container>
                      <Button
                        variant="danger"
                        onClick={() => onDeleteHandler(r._id)}
                      >
                        <TiDelete />
                      </Button>
                    </Container>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-content-center text-center mt-5">
        <Col md={6}>
          <Container className="comment-box p-3">
            <h2>Add a review</h2>
            <Form>
              <Form.Group
                className="w-50 mx-auto"
                controlId="exampleForm.ControlSelect1"
              >
                <Form.Label>Select Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rate}
                  onChange={(e) => {
                    onChangeHandler(e.target.value, setRate);
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter your comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => {
                    onChangeHandler(e.target.value, setComment);
                  }}
                />
              </Form.Group>
              <Button variant="info" onClick={onSubmitHandler}>
                Submit
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
