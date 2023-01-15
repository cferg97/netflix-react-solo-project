import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchAction } from "../redux/actions";

import { setIsLoadingAction } from "../redux/actions";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const searchQuery = useSelector((state) => state.query);
  const isLoading = useSelector((state) => state.isLoading);
  const searchResults = useSelector((state) => state.searchResults);

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(setIsLoadingAction(true));
      setTimeout(() => {
        dispatch(searchAction(searchQuery));
        dispatch(setIsLoadingAction(false));
      }, 500);
    },
    [searchQuery]
  );

  return (
    <Container>
      <Row> 
        <Col md={10}>
          {isLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {searchQuery && (
            <h1 className="text-white">Search results for "{searchQuery}"</h1>
          )}
          {searchQuery &&
            searchResults &&
            searchResults.map((m) => (
              <Link to={"/details/" + m.imdbID}>
                <h3 className="text-white hover">{m.Title}</h3>
              </Link>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
