import React from 'react';
import ReactDOM from 'react-dom';
import Nb from './components/App';
import Profile from './components/profile.components'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Profile />, document.getElementById('profile'));