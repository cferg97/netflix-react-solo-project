import { Component } from "react";
import { Container, Carousel, Row, Col, Spinner } from "react-bootstrap";

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
      <Container fluid className="m-2">
        <h5 className="text-light mt-2 mb-4">{this.props.title}</h5>
        <Carousel controls={true} indicators={false}>
          <div class="carousel-inner">
            <div class="carousel-item active">
              {this.state.isLoading && (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
              <div class="movie-row">
                <div class="row">
                  {this.state.movies.slice(0, 6).map((m) => (
                    <div class="col-md-2">
                      <img alt="" class="movie-cover" src={m.Poster} />
                    </div>
                  ))}
                </div>
                <div class="carousel-item ">
                  <div class="movie-row">
                    <div class="row">
                      {this.state.movies.slice(6, 13).map((m) => (
                        <div class="col-md-2">
                          <img alt="" class="movie-cover" src={m.Poster} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </Container>
    );
  }
}

export default Gallery1;
