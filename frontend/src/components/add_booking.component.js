import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddBooking extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
          locationId: '',
          userId: '',
          dateFrom: '',
          dateTo: '',
          roomCount: '',
          price: ''
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

     script_tag = document.getElementById('booking_script')
     arr = this.script_tag.getAttribute('data-items').split('--')[0]
     nrRooms = this.script_tag.getAttribute('data-items').split('--')[1]
    resetFile(event) {
        event.preventDefault();
        this.setState({ imagePath: null });
    }

    handle_add_booking = (e, data) =>
    {
        e.preventDefault();

        this.state.locationId = this.arr
        this.state.price = Math.random()

        fetch(`http://localhost:8000/booking/${this.arr}`,
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
                  return res.json()
              }
              else
              {
                  throw new Error('Something went wrong...');
              }
          })


//        var location_data = {nrOfRooms: this.nrRooms - this.state.roomCount};
//
//        fetch(`http://localhost:8000/update_location/${this.arr}`,
//         {
//          method: 'PUT',
//          headers: {
//            'Content-Type': 'application/json',
//            'Accept': 'application/json',
//            'Authorization' : `Token ${localStorage.getItem('token')}`
//          },
//          body: JSON.stringify(location_data)
//        })
//        .then(res => {
//              if (res.ok)
//              {
//                  return res.json()
//              }
//              else
//              {
//                  throw new Error('Something went wrong...');
//              }
//          })
    };


    updateRoomCount = e =>
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

    updateDateFrom = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateDateTo = e =>
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    render()
      {
        return (
         <>
         <div className="App" style={{ width: '400px', margin: 'auto', marginTop: '100px'}}>
                <form onSubmit={e => this.handle_add_booking(e, this.state)}>
                    <h3>Add Location</h3>

                    <div className="form-group">
                        <label>Date From</label>
                        <input name="dateFrom"
                               type="text"
                               className="form-control"
                               placeholder="Enter date from"
                               value={this.state.dateFrom}
                               onChange={this.updateDateFrom}/>
                    </div>

                    <div className="form-group">
                        <label>Date To</label>
                        <input name="dateTo"
                               className="form-control"
                               placeholder="Enter date to"
                               value={this.state.dateTo}
                               onChange={this.updateDateTo}/>
                    </div>

                    <div className="form-group">
                        <label>Room Count</label>
                        <input name="roomCount"
                               className="form-control"
                               placeholder="Enter room count"
                               value={this.state.roomCount}
                               onChange={this.updateRoomCount}/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
            </>
        );
      }
}

export default AddBooking;
