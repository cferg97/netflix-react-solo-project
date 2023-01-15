import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchAction, setSearchQueryAction } from "../redux/actions";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setTimeout(() => {
        dispatch(setSearchQueryAction(e.target.value));
        if (location.pathname !== "/search") {
          navigate("/search");
        }
        dispatch(searchAction(query));
      }, 400);
    }
  };

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };

  return (
    <Navbar expand="lg" bg="dark" className="color-nav" variant="dark">
      <Container fluid>
        <Link to="/" onClick={setSearchQueryAction("")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="Netflix Logo"
            className="logo mr-3"
          />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/">
              <div
                className={
                  location.pathname === "/" ? "nav-link active" : "nav-link"
                }
              >
                Home
              </div>
            </Link>
            <Link to="/tvshows">
              <div
                className={
                  location.pathname === "/tvshows"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                TV Shows
              </div>
            </Link>
            <Nav.Link>Movies</Nav.Link>
            <Nav.Link>Recently Added</Nav.Link>
            <Nav.Link>My List</Nav.Link>
            <Nav.Link href="/add-new">Admin</Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            <input
              className="my-auto"
              id="search-bar"
              // onClick={() => {
              //   if (location.pathname !== "/search") {
              //     navigate("/search");
              //   }
              // }}
              onChange={(e) => {
                onChangeHandler(e.target.value, setQuery);
              }}
              value={query}
              type="text"
              onKeyDown={(e) => handleEnter(e)}
              placeholder={
                location.pathname === "/tvshows"
                  ? "Search for TV Shows"
                  : "Search"
              }
            ></input>
            <button
              className="submit-btn my-auto"
              onClick={() => {
                dispatch(setSearchQueryAction(query));
                if (location.pathname !== "/search") {
                  navigate("/search");
                }
                dispatch(searchAction(query));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search icon"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
            <Nav.Link>KIDS</Nav.Link>
            <Nav.Link>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-bell-fill icon"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
              </svg>
            </Nav.Link>
            <Nav.Item className="d-flex">
              <img
                className="mt-1"
                alt=""
                src="./assets/avatar.png"
                id="avatar"
              />
              <NavDropdown title="User" className="mr-5">
                <NavDropdown.Item className="drop-item text-light">
                  <div className="flex-row">
                    <img
                      src="./assets/avatar.png"
                      id="avatar-small"
                      alt="avatar"
                    />
                  </div>{" "}
                  Manage Profile
                </NavDropdown.Item>
                <NavDropdown.Item className="text-light drop-item">
                  Account
                </NavDropdown.Item>
                <NavDropdown.Item className=" text-light drop-item">
                  Help Center
                </NavDropdown.Item>
                <hr className="dropdown-divider" />
                <NavDropdown.Item className="text-light drop-item">
                  Signout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
