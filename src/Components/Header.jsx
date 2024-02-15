import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import logo from './logo.png'

function Header() {
  return (

<Navbar expand="lg" className="    shadow-lg rounded-lg container-fluid rounded w-100">
      <div className='container-fluid p-2'>
        <Navbar.Brand className='fw-bold fs-4 d-flex align-items-center' href="#home">
         <img src={logo} alt='noimage' width={'3%'}/>
          Gizmo Grid</Navbar.Brand>
        <Navbar.Toggle className='w-100' aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='w-100' id="basic-navbar-nav">
          <Nav className="w-100">
            <div className='d-flex w-100 justify-content-end'>
               <Link className='mt-2' style={{textDecoration:'none',color:'Black'}} to={'/home'}>Prefernces</Link>
            <button className='btn btn-info ms-3 w-50 me-3'>  <Link style={{textDecoration:'none',color:'black'}} to={'/adminlogin'}>Admin Login</Link> </button>

            </div>
           
          </Nav>

        </Navbar.Collapse>
      </div>
    </Navbar>

  )
}

export default Header