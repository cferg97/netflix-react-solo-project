import { Component } from "react";
import { Container, Row, Col, Carousel, Spinner } from "react-bootstrap";

class MovieGallery extends Component {
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
            movies: data.Search,
          });
        }, 2000);
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
      <Container fluid className="movie-gallery m-2">
        <h5 className="text-light mt-2 mb-2">{this.props.query}</h5>
        <Carousel indicators={false}>
          <Carousel.Item active>
            <Container className="movie-row">
            {this.state.isLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
              <Row>
                {this.state.movies.slice(0, 6).map((m) => (
                  <Col md={2} key={m.imdbID}>
                    <img alt="" className="movie-cover" src={m.Poster} />
                  </Col>
                ))}
              </Row>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <Container className="movie-row">
              <Row>
                {this.state.movies.slice(6,13).map((n) => (
                  <Col md={2} key={n.imdbID}>
                    <img alt="" className="movie-cover" src={n.Poster} />
                  </Col>
                ))}
              </Row>
            </Container>
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}

export default MovieGallery;
