import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SignUp extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
          username: '',
          password: '',
          rePassword: '',
          first_name: '',
          last_name: '',
          phone_number: '',
          address: '',
          email_address: '',
          err: '1'
        };
    }

    handle_signup = (e, data) =>
    {
        e.preventDefault();

        fetch('http://localhost:8000/users/',
         {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
         .then(res => res.json())

         fetch('http://localhost:8000/db_user/',
         {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => {
              if (res.ok)
              {
                  this.setState({ err: '2' })
                  return res.json()
              }
              else
              {
                  this.setState({ err: '3' })
                  throw new Error('Something went wrong...');
              }
          })
    };

    updateUser = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updatePassword = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateRePassword = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateFirstName = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateLastName = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updatePhoneNumber = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateEmailAddress = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateAddress = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

      render()
      {
        if (this.state.err == '2')
        {
            console.log("Here!!!");
            window.location.pathname = '/';
        }

        return (
         <>
         <div className="App" style={{ width: '400px', margin: 'auto', marginTop: '100px'}}>
                <form onSubmit={e => this.handle_signup(e, this.state)}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input name="username"
                               type="text"
                               className="form-control"
                               placeholder="Enter username"
                               value={this.state.username}
                               onChange={this.updateUser}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input name="password"
                               type="password"
                               className="form-control"
                               placeholder="Enter password"
                               value={this.state.password}
                               onChange={this.updatePassword}/>
                    </div>

                    <div className="form-group">
                        <label>Re-type password</label>
                        <input name="rePassword"
                               type="password"
                               className="form-control"
                               placeholder="Enter password again"
                               value={this.state.rePassword}
                               onChange={this.updateRePassword}/>
                    </div>

                    <div className="form-group">
                        <label>First Name</label>
                        <input name="first_name"
                               type="text"
                               className="form-control"
                               placeholder="Enter first name"
                               value={this.state.first_name}
                               onChange={this.updateFirstName}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input name="last_name"
                               type="text"
                               className="form-control"
                               placeholder="Enter last name"
                               value={this.state.last_name}
                               onChange={this.updateLastName}/>
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input name="phone_number"
                               type="text"
                               className="form-control"
                               placeholder="Enter phone number"
                               value={this.state.phone_number}
                               onChange={this.updatePhoneNumber}/>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input name="address"
                               type="text"
                               className="form-control"
                               placeholder="Enter address"
                               value={this.state.address}
                               onChange={this.updateAddress}/>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input name="email_address"
                               type="text"
                               className="form-control"
                               placeholder="Enter email address"
                               value={this.state.email_address}
                               onChange={this.updateEmailAddress}/>
                    </div>

                     <h3 style={{ color: 'red', fontSize: '12px' }}>
                        {this.state.err == '3' ? 'Username already exists' : ''}
                    </h3>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
            </>
        );
      }
}

export default SignUp;
