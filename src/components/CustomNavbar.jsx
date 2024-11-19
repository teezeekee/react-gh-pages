import { Nav, Navbar } from "@govtechsg/sgds-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo-white.png";
import React, { useState } from "react";

export default function CustomNavbar({
  currentActiveNav = "home",
  openSidebar,
  setOpenSidebar,
  openRightbar,
  setOpenRightbar,
  ...props
}) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar className={`align-items-center justify-content-between px-8`}>
        <Navbar.Brand onClick={() => navigate("/")}>
          <img src={logo} />
        </Navbar.Brand>

        <div className={`d-flex gap-3 align-items-center`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle cx="24" cy="24" r="24" fill="#D9D9D9" />
          </svg>
          Jane Doe
        </div>
      </Navbar>

      <Navbar
        expand="lg"
        className={`bg-blue text-right`}
        style={{ minHeight: "fit-content" }}
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`align-items-center justify-content-center `}
        >
          <Nav className="mx-auto d-flex gap-5" navbarScroll>
            <Nav.Item>
              <Nav.Link
                className={`custom-nav`}
                eventKey="home"
                onClick={() => navigate("/administration/workflow-list")}
              >
                Administration
              </Nav.Link>
            </Nav.Item>


            <Nav.Item>
              <Nav.Link
                className={`custom-nav `}
                eventKey="link"
                onClick={() => navigate("/request/course-withdrawal")}
              >
                Request
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
