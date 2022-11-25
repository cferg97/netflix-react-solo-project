import { Component } from "react";
import { Container, Carousel, CarouselItem, Row, Col } from "react-bootstrap";

class Gallery1 extends Component {
  render() {
    return (
      <Container fluid className="m-2">
        <h5 className="text-light mt-2 mb-4">{this.props.title}</h5>
        <Carousel indicators={false}>
          <Container className="movie-row">
              <Container>
              <Row className="d-flex m-auto">
                <Col md={2}>
                  <img
                    alt=""
                    className="movie-cover"
                    src="./assets/media/media0.jpg"
                  />
                </Col>
                </Row>
              </Container>
            
          </Container>
        </Carousel>
      </Container>
    );
  }
}

export default Gallery1;
