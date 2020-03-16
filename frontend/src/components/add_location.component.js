import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddLocation extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
          userId: '',
          name: '',
          address: '',
          phoneNumber: '',
          emailAddress: '',
          webSiteAddress: '',
          nrOfRooms: '',
          imagePath: null,
          description:'',
          err: '1'
        };
        this.onChange = this.onChange.bind(this);
        this.resetFile = this.resetFile.bind(this);
    }
    onChange(event) {
            this.setState({
            imagePath: URL.createObjectURL(event.target.files[0])
        });
            console.log(this.state.imagePath);
    }


    resetFile(event) {
        event.preventDefault();
        this.setState({ imagePath: null });
    }

    handle_add_location = (e, data) =>
    {
        e.preventDefault();

        fetch('http://localhost:8000/add/',
         {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization' : `Token ${localStorage.getItem('token')}`
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
        console.log(JSON.stringify(data))
    };


    updateName = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
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
            .then((data) => { this.setState({userId: data.userId}) })
    }

    updateAddress = e =>
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

    updateWebSiteAddress = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateImagePath = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateNrOfRooms = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateDescription = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    render()
      {
        return (
         <>
         <div className="App" style={{ width: '400px', margin: 'auto', marginTop: '100px'}}>
                <form onSubmit={e => this.handle_add_location(e, this.state)}>
                    <h3>Add Location</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input name="name"
                               type="text"
                               className="form-control"
                               placeholder="Enter location name"
                               value={this.state.name}
                               onChange={this.updateName}/>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input name="address"
                               className="form-control"
                               placeholder="Enter address"
                               value={this.state.address}
                               onChange={this.updateAddress}/>
                    </div>

                    <div className="form-group">
                        <label>Phone number</label>
                        <input name="phoneNumber"
                               className="form-control"
                               placeholder="Enter phone number"
                               value={this.state.phoneNumber}
                               onChange={this.updatePhoneNumber}/>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input name="emailAddress"
                               type="text"
                               className="form-control"
                               placeholder="Enter email address"
                               value={this.state.emailAddress}
                               onChange={this.updateEmailAddress}/>
                    </div>

                    <div className="form-group">
                        <label>Web Site Address</label>
                        <input name="webSiteAddress"
                               type="text"
                               className="form-control"
                               placeholder="Enter web site address"
                               value={this.state.webSiteAddress}
                               onChange={this.updateWebSiteAddress}/>
                    </div>

                    <div className="form-group">
                        <label>Number of rooms</label>
                        <input name="nrOfRooms"
                               type="text"
                               className="form-control"
                               placeholder="Enter number of rooms"
                               value={this.state.nrOfRooms}
                               onChange={this.updateNrOfRooms}/>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input name="description"
                               type="text"
                               className="form-control"
                               placeholder="Enter description"
                               value={this.state.description}
                               onChange={this.updateDescription}/>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
            </>
        );
      }
}

export default AddLocation;
