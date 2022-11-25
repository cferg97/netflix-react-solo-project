import { Component } from "react";
import { Container, Carousel,  Row, Col, Spinner } from "react-bootstrap";

class Gallery1 extends Component {
  state = {
    movies: [],
    isLoading: true,
  };

  fetchMovies = async () => {
    try {
      let response = await fetch(
        `http://www.omdbapi.com/?s=${this.props.query}&apikey=595fb9cf`
      );
      if (response.ok) {
        let data = await response.json();
        setTimeout(() => {
            this.setState({
              isLoading: false,
              movies: data.Search
            });
          }, 2000)
      } else {
        console.log("there was a problem fetching movies");
        this.setState({
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    this.fetchMovies(this.props.query);
  }

  render() {
    return (
      <Container fluid className="m-2">
        <h5 className="text-light mt-2 mb-4">{this.props.title}</h5>
        <Carousel indicators={false}>
          <Container className="movie-row">
            <Container>
            {this.state.isLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
              <Row className="d-flex m-auto">
                {this.state.movies.slice(0,6).map((m) => (
                  <Col md={2} key={m.imdbID}>
                    <img alt="" className="movie-cover" src={m.Poster} />
                  </Col>
                ))}
              </Row>
              <Row className="d-flex m-auto">
              {this.state.movies.slice(6,13).map((m) => (
                  <Col md={2} key={m.imdbID}>
                    <img alt="" className="movie-cover" src={m.Poster} />
                  </Col>
                ))}
              </Row>
            </Container>
          </Container>
        </Carousel>
      </Container>
    );
  }
}

export default Gallery1;
