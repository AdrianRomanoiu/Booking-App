## react-simple-dialog

<a href="https://nodei.co/npm/react-simple-dialog/"><img src="https://nodei.co/npm/react-simple-dialog.png?downloads=true&downloadRank=true&stars=true"></a>

Very simple react dialog

## Install

	npm install react-simple-dialog

## Usage

import:

	import Dialog from 'react-simple-dialog';
	import 'react-simple-dialog/dist/dialog.css';

in JSX:

	<Dialog ref='dialog'/>

in click:

	this.refs.dialog.show({
      config: {
        title: 'info',
        tip: 'confirm？'
      },
      okfunc: function(){
          location.href = "#/ctrldesk"
        }.bind(this)
    });

## Compile

	babel ./src/dialog.js --out-file ./dist/dialog.js