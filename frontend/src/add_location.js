import React from 'react';
import ReactDOM from 'react-dom';
import Nb from './components/App';
import AddLocation from './components/add_location.component'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<AddLocation />, document.getElementById('add_booking'));