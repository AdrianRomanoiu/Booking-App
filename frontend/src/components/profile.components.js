import React, { Component } from "react";
import {Avatar} from "antd";
import { Redirect, withRouter } from 'react-router-dom';

class Profile extends Component
{
    constructor(props)
    {
        super(props)
        this.state =
        {
          username: '',
          first_name: '',
          last_name: '',
          phone_number: '',
          address: '',
          email_address: '',
          userId: '',
          err: '1'
        };
    }

    updateUser = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    updateFirstName = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    updateLastName = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    updatePhoneNumber = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    updateEmailAddress = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    updateAddress = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    updateUserId = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        fetch(`http://localhost:8000/current_user/${localStorage.getItem('username')}`,
            {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Token ${localStorage.getItem('token')}`
                    }
                }
            )
            .then(data => data.json())
            .then((data) => { this.setState({ username: data.username,
                                                            first_name: data.first_name,
                                                            last_name: data.last_name,
                                                            phone_number: data.phone_number,
                                                            address: data.address,
                                                            email_address: data.email_address,
                                                            userId: data.userId}) })
            .then(data => console.log(data))
        console.log(this.state)
    }

    handle_profile = (e, data) => {
        e.preventDefault();
        console.log(localStorage.getItem('username'));
        fetch(`http://localhost:8000/users/${localStorage.getItem('username')}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => this.setState({data}));

    }

    handle_add_location = (e, data) => {
        e.preventDefault();
        window.location.pathname = 'add_location/'
    }


    render() {

        return (
            <>
            <div className="App">
                <h3>Profile</h3>

                <div>
                  <Avatar size={64} icon="user" />
                </div>

                <form onSubmit={e => this.handle_login(e, this.state)}>

                    <div className="form-group">
                        <label>Username</label>
                        <input name="username"
                               contentEditable={"false"}
                               type="text"
                               className="form-control"
                               placeholder="Enter username"
                               value={this.state.username}
                               onChange={this.updateUser}/>
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

                    <button onClick={this.handle_add_location} type="submit" className="btn btn-primary btn-block">Add Location</button>
                </form>


            </div>
            </>
        );
    }
}

export default Profile;