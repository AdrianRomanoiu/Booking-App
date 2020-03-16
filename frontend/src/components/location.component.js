import React, { Component } from "react";
import Img from 'react-image'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import StarRatings from 'react-star-ratings'
import { moment } from 'react-moment'
import { TextInput } from 'react-native-web';

var rating = 0
var err = false

function Example() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var description
  var script_tag = document.getElementById('location_script')
  var arr = script_tag.getAttribute('data-items').split('--')[0]

  var state = { userId: '' }

   fetch(`http://localhost:8000/current_user/${localStorage.getItem('username')}`,
            {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Token ${localStorage.getItem('token')}`
                    }
                }
            )
   .then(data => {
              if (data.ok)
              {
                  err = false
                  return data.json()
              }
              else
              {
                  err = true
                  throw new Error('Something went wrong...');
              }
          })
   .then((data) => { state.userId = data.userId });

   const handleSubmit = () =>
  {
       console.log("Here")
       var review_data =
        {
          locationId: '',
          userId: '',
          description: '',
          score: '',
          date: ''
       }

        var today = new Date()
        review_data.date = Intl.DateTimeFormat('fr-ca').format(today)
        review_data.userId = state.userId
        review_data.locationId = arr
        review_data.score = rating
        review_data.description = description
        console.log(review_data)

       const options =
        {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(review_data)
        }

        fetch('http://localhost:8000/review/', options)

        .then(res => {
              if (res.ok)
              {
                  return res.json()
              }
              else
              {
                  throw new Error('Something went wrong...');
              }
          });
  }

  function changeRating( newRating, name )
  {
      rating = newRating
      console.log(rating)
  }

  function doChange(value)
  {
    description = value
    console.log(description)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>Add review</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write review here...</Modal.Title>
        </Modal.Header>
        <Modal.Body><input onChange={e => doChange(e.target.value)} value={description} style={{width: '450px'}} type="text"/></Modal.Body>
        <Modal.Footer>
         <StarRatings
              rating={rating}
              starRatedColor="blue"
              changeRating={changeRating}
              numberOfStars={5}
              name='rating'
            />
          <Button variant="primary" onClick={handleSubmit}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class Page extends Component
{
    constructor(props)
    {
        super(props)

        this.state =
        {
          locationId: '',
          userId: '',
          name: '',
          phoneNumber: '',
          address: '',
          webSiteAddress: '',
          nrOfRooms: '',
          imagePath: '',
          description: '',
          emailAddress: '',
        };
    }

    script_tag = document.getElementById('location_script')
    arr = this.script_tag.getAttribute('data-items').split('--')[0]
    img = this.script_tag.getAttribute('data-items').split('--')[1]

    componentDidMount()
    {
        fetch(`http://localhost:8000/location/${this.arr}`,
            {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                    }
                }
            )
            .then(data => data.json())
            .then((data) => { this.setState({   locationId: data.locationId,
                                                userId: data.userId,
                                                name: data.name,
                                                phoneNumber: data.phoneNumber,
                                                address: data.address,
                                                webSiteAddress: data.webSiteAddress,
                                                nrOfRooms: data.nrOfRooms,
                                                imagePath: data.imagePath,
                                                description: data.description,
                                                emailAddress: data.emailAddress }) });
    };

    user = localStorage.getItem('username');
    render() {
            return (
           <>
           <div className="row">
            <div className="col1">
                 <Img style={{ width: '5500px', height: '500px', marginLeft: '10px'}} src={"/media/" + this.img} />
            </div>
            <div className="col2">
                 <div className="row1" style={{ marginBottom: '100px', color: 'purple', fontSize: '50px'}}>
                    <b>{this.state.name}</b>
                 </div>
                 <div className="row2" style={{ marginBottom: '50px'}}>
                    <h><b>Descriere: </b>{this.state.description}</h>
                 </div>
                 <div className="row3" style={{ marginBottom: '50px'}}>
                    <h><b>Adresa: </b>{this.state.address}</h>
                 </div>
                 <div className="row4" style={{ marginBottom: '50px'}}>
                    <h><b>Telefon: </b>{this.state.phoneNumber}</h>
                 </div>
                 <div className="row5" style={{ marginBottom: '50px'}}>
                    <h><b>Email: </b>{this.state.emailAddress}</h>
                 </div>
                 <div className="row6" style={{ marginBottom: '50px'}}>
                    <h><b>Website: </b>{this.state.webSiteAddress}</h>
                 </div>
                  <div className="row7" style={{ marginBottom: '50px'}}>
                    <h><b>Camere disponoibile: </b>{this.state.nrOfRooms}</h>
                 </div>
                     {err == true ?  '' : <Example />}

            </div>
       </div>
        </>
    );
    }
}

export default Page;
