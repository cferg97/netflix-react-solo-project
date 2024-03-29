import { Component } from "react";
import { Container, Row, Col, Carousel, Spinner } from "react-bootstrap";
import Alerts from "./AlertComp";
import { Link } from "react-router-dom";


class MovieGallery extends Component {
  state = {
    movies: [],
    isLoading: true,
    isError: false,
  };

  fetchMovies = async () => {
    try {
      let response = await fetch(
        `https://m2-soloproj-netflix-api-production.up.railway.app/media?search=${this.props.query}`
      );
      if (response.ok) {
        let data = await response.json();
        setTimeout(() => {
          this.setState({
            isLoading: false,
            movies: data,
            // movies: data.Search,
          });
        }, 2000);
      } else {
        console.log("there was a problem fetching movies");
        this.setState({
          isError: true,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        isError: true,
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
          {this.state.isError && <Alerts />}
          <Carousel.Item active="true">
            <Container className="movie-row">
              {this.state.isLoading && (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
              <Row>
                {this.state.movies.slice(0, 4).map((m) => (
                  <Col md={3} key={m.imdbID}>
                    <Link to={"/details/" + m.imdbID}>
                      <img alt="" className="movie-cover" src={m.Poster} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </Container>
          </Carousel.Item>
          {/* {/* <Carousel.Item>
            <Container className="movie-row">
              <Row>
                {this.state.movies.slice(4, 8).map((n) => (
                  <Col md={3} key={n.imdbID}>
                    <Link to={"/details/" + n.imdbID}>
                      <img alt="" className="movie-cover" src={n.Poster} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </Container>
          </Carousel.Item> */}
          {/* <Carousel.Item>
            <Container className="movie-row">
              <Row>
                {this.state.movies.slice(8, 12).map((o) => (
                  <Col md={3} key={o.imdbID}>
                    <Link to={"/details/" + o.imdbID}>
                      <img alt="" className="movie-cover" src={o.Poster} />
                    </Link>
                  </Col>
                ))}
              </Row>
            </Container>
          </Carousel.Item> */}
        </Carousel>
      </Container>
    );
  }
}

export default MovieGallery;
