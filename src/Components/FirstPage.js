import React from 'react';
import { Nav } from 'react-bootstrap';
import './Shablon-style.css';


export default function FirstPage() {

  return (
    <>
    <div className="center-link">
      <Nav.Link href="/post">See posts</Nav.Link>
    </div>
    </>
  )
}