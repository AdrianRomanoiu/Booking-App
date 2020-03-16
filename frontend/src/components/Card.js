import React, { useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';

function Crd(props) {
    var script_tag = document.getElementById('main')
    var arr = script_tag.getAttribute('data-items').split('; ')

    var elements = []

    for (var i = 0; i < arr.length - 1; i++)
    {
        var locationId = arr[i].split(', ')[3]
            elements.push(
                <a href={ '/locationId=' + locationId }>
                    <Card style={{ width: '70rem', marginRight: '35px', marginLeft: '135px'}}>
                      <Card.Img variant="top" src={"/media/" + arr[i].split(', ')[2]} />
                      <Card.Body>
                        <Card.Title>{ arr[i].split(', ')[0] }</Card.Title>
                        <Card.Text>{ arr[i].split(', ')[1] }</Card.Text>
                      </Card.Body>
                    </Card>
                </a>
            )

    }

    const divStyle = {
        marginLeft: '-150px',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
    <div style={divStyle}>
        {elements}
    </div>
    );
}

export default Crd;
