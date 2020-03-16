import React, { useState, Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';

function handle_logout()
{
    window.location.reload();
    localStorage.removeItem('token');
};

function Nb(props)
{
      return (
            <div >
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                    <style>
                        {" body { padding-top: 70px; } "}
                    </style>

                    <a href="#home" className="title" href="#home">Booking</a>
                    <style>
                        {" .title { padding-left: 100px; color: white; padding-top: 10px; } "}
                    </style>
                    <style>
                        {" a:hover { text-decoration: none; color: white;} "}
                    </style>
                    <style>{" .signup_button { position: absolute; left: 1225px; } "}</style>
                    <style>{" .login_button  { position: absolute; left: 1315px; } "}</style>
                    <style>{" .search_button { position: absolute; left: 1410px; } "}</style>

                    { localStorage.getItem('token') == null ?
                        <Button href="sign_up" className="signup_button" variant="primary">Sign Up</Button>
                    :
                        <Button href="profile" className="signup_button" variant="primary">Profile</Button>
                    }

                    { localStorage.getItem('token') == null ?
                        <Button href="log_in" className="login_button" variant="primary">Login</Button>
                    :
                        <Button onClick={handle_logout} className="login_button" variant="primary">Log Out</Button>
                    }

                     <Button href="search" className="search_button" variant="primary">Search</Button>

                </Navbar>
            </div>
      );
}

export default Nb;
