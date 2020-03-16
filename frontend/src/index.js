import React from 'react';
import ReactDOM from 'react-dom';
import Nb from './components/App';
import App from './components/App';
import Crd from './components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render([<Nb />, <Crd />], document.getElementById('app'));
