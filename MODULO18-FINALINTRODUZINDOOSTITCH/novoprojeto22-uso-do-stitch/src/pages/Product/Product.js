import React, { Component } from 'react';

// import axios from 'axios';

import './Product.css';

import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import BSON from 'bson';


class ProductPage extends Component {
  state = { isLoading: true, product: null };



  componentDidMount() {
    // axios
    //   .get('http://localhost:3100/products/' + this.props.match.params.id)
    //   .then((productResponse) => {
    //     console.log('TEST1151515')
    //     this.setState({ isLoading: false, product: productResponse.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ isLoading: false });
    //     console.log(err);
    //     this.props.onError(
    //       'Loading the product failed. Please try again later.'
    //     );
    //   });

    const mongodb = Stitch.defaultAppClient.getServiceClient(
      RemoteMongoClient.factory,
      'mongodb-atlas'
    );


    console.log(mongodb);

    mongodb
      .db('shop2')
      .collection('products')
      .find({ 
        
        // _id: this.props.match.params.id
                _id: BSON.ObjectId(this.props.match.params.id)
      })
      .toArray()
      .then((productResponse) => {
        console.log(productResponse);
        this.setState({ product: productResponse[0], isLoading: false });
      })
      .catch((err) => {
        this.props.onError(
          'Fetching the product failed. Please try again later.'
        );
      });
  }

  render() {
    let content = <p>Is Loading...</p>;

    if (!this.state.isLoading && this.state.product) {
      content = (
        <main className="product-page">
          <h1>{this.state.product.name}</h1>
          <h2>{'$' + this.state.product.price}</h2>
          <div
            className="product-page__image"
            style={{
              backgroundImage: "url('" + this.state.product.image + "')",
            }}
          />
          <p>{this.state.product.description}</p>
        </main>
      );
    }

    if (!this.state.isLoading && !this.state.product) {
      content = (
        <main>
          <p>Found no product. Try again later.</p>
        </main>
      );
    }

    return content;
  }
}

export default ProductPage;
