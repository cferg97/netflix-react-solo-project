import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { newMediaAction } from "../redux/actions";
import { addPosterAction } from "../redux/actions";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [media, setMedia] = useState("Movie");
  const [imdbID, setImdbId] = useState("");
  const [poster, setPoster] = useState();
  const idForPoster = useSelector((state) => state.id);

  const itemToSend = {
    Title: title,
    Year: year,
    Type: media,
    imdbID: imdbID,
  };

  console.log(itemToSend);

  const posterChangeHandler = (e) => {
    setPoster(e.target.files);
    console.log(poster);
  };

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };

  const onSubmitHandler = () => {
    dispatch(newMediaAction(itemToSend));
    setTimeout(() => {
      const formData = new FormData();
      formData.append("poster", poster);
      dispatch(addPosterAction(idForPoster, formData));
    }, 1000);
  };

  return (
    <Container className="mb-4">
      <Row className="justify-content-center">
        <Col md={10} className="text-center">
          <h1 className="text-white">Admin Page</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={10}>
          <Container
            className="p-2 justify-content-center text-center rounded"
            style={{ backgroundColor: "darkgray" }}
          >
            <h2>Add a new media</h2>
            <Form className="mx-auto" style={{ width: "20rem" }}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  placeholder="Enter the title"
                  onChange={(e) => {
                    onChangeHandler(e.target.value, setTitle);
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Year of release</Form.Label>
                <Form.Control
                  type="text"
                  value={year}
                  placeholder="Enter the year of release. e.g 2017"
                  onChange={(e) => onChangeHandler(e.target.value, setYear)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Type of media</Form.Label>
                <Form.Control
                  value={media}
                  as="select"
                  onChange={(e) => onChangeHandler(e.target.value, setMedia)}
                >
                  <option>Movie</option>
                  <option>Series</option>
                  <option>Game</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>IMDB ID</Form.Label>
                <Form.Control
                  value={imdbID}
                  type="text"
                  placeholder="Must begin with 'tt'. Found on IMDB site."
                  onChange={(e) => onChangeHandler(e.target.value, setImdbId)}
                />
              </Form.Group>

              <Form.Group>
                <Form.File
                  name="poster"
                  onChange={(e) => posterChangeHandler(e)}
                  accept=".jpg, .jpeg"
                  label="Upload Poster. JPEG only."
                />
              </Form.Group>

              <Button variant="outline-warning" onClick={onSubmitHandler}>
                Add entry
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
