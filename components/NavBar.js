/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Bangazon</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href={`/profile/${user.id}`}>
              <Nav.Link>My Profile</Nav.Link>
            </Link>
            <Link passHref href="/orders">
              <Nav.Link>My Order History</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link>Product Categories</Nav.Link>
            </Link>
            <Link passHref href="/cart">
              <Nav.Link>Cart</Nav.Link>
            </Link>

            <Button variant="danger" onClick={signOut}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
