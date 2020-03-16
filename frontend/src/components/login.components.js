import React, { Component } from "react";
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
          username: '',
          password: '',
          err: false
        };
    }

    componentDidMount()
    {
        if (localStorage.getItem('token'))
        {
            fetch(
                'http://localhost:8000/current_user/',
                { headers: { Authorization: `JWT ${localStorage.getItem('token')}` } } )

            .then(res => res.json())
            .then(json => { this.setState({ username: json.username }); });
        }
    }

    handle_login = (e, data) =>
    {
        e.preventDefault();

        const options =
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(data)
        }

        fetch('http://localhost:8000/token-auth/', options)

        .then(res => {
              if (res.ok)
              {
                  this.setState({ err: false })
                  return res.json()
              }
              else
              {
                  this.setState({ err: true })
                  throw new Error('Something went wrong...');
              }
          })

        .then(json => {
            localStorage.setItem('token', json.token);
            this.setState({ username: json.user.username });
        });

        localStorage.setItem('username', this.state.username);s

        var arr = document.getElementById('login').getAttribute('data-items').split(', ')
        for (var i = 0; i < arr.length - 1; i++)
        {
            if(this.state.username == arr[i].split('--')[0])
            {
                localStorage.setItem('userId', arr[i].split('--')[1])
                break
            }
        }
    }

    updateUser = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updatePassword = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    render()
    {
        if (localStorage.getItem('token') != null)
        {
            window.location.pathname = '/';
        }

        return (
        <>
        <div className="App" style={{ width: '400px', margin: 'auto', marginTop: '100px'}}>
            <form onSubmit={e => this.handle_login(e, this.state)}>
                <h3>Log In</h3>

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
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <h3 style={{ color: 'red', fontSize: '12px' }}>
                    {this.state.err == false ? '' : 'Invalid username or password'}
                </h3>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
        </>
        );
    }
}

export default withRouter(Login);