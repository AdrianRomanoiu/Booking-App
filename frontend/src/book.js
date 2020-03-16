import React from 'react';
import ReactDOM from 'react-dom';
import Nb from './components/App';
import AddBooking from './components/add_booking.component'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<AddBooking />, document.getElementById('add_booking'));