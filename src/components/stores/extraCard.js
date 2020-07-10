import React from 'react';
import Card from 'react-bootstrap/Card';

export default function ExtraCard() {
    return (
        <Card >
            {/* <Card.Img variant="top" src={store.storeImageUrl} alt={store.name} /> */}
            <Card.Body>
                <Card.Title>
                    Looking For Our Other Stores?
                </Card.Title>
                <Card.Text>
                  Please complete or delete your order to shop at our other stores
                </Card.Text>
            </Card.Body>
        </Card>
    );
}