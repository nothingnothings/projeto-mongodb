// import React, { Component } from 'react';

// import axios from 'axios';

// import Products from '../../components/Products/Products';

// class ProductsPage extends Component {
//   state = { isLoading: true, products: [] };

//   componentDidMount() {
//     axios
//       .get('http://localhost:3100/products')
//       .then((productsResponse) => {
//         console.log(productsResponse);
//         this.setState({ isLoading: false, products: productsResponse.data });
//       })
//       .catch((err) => {
//         this.setState({ isLoading: false, products: [] });
//         this.props.onError('Loading products failed. Please try again later.');
//         console.log(err);
//       });
//   }

//   productDeleteHandler = (productId) => {
//     console.log(productId);
//     axios
//       .delete('http://localhost:3100/products/' + productId)
//       .then(() => {
//         this.setState((prevState) => {
//           const products = [...prevState.products]
//          const updatedProducts = products.filter((product) => {
//             return product._id !== productId;
//           });
//           return {
//             isLoading: false,
//             products: updatedProducts,
//           };
//         });
//       })
//       .catch((err) => {
//         this.props.onError(
//           'Deleting the product failed. Please try again later.'
//         );
//         console.log(err);
//       });
//   };

//   render() {
//     let content = <p>Loading products...</p>;

//     if (!this.state.isLoading && this.state.products.length > 0) {
//       content = (
//         <Products
//           products={this.state.products}
//           onDeleteProduct={this.productDeleteHandler}
//         />
//       );
//     }

//     if (!this.state.isLoading && this.state.products.length === 0) {
//       content = <p>Found no products. Try again later.</p>;
//     }
//     return <main>{content}</main>;
//   }
// }

// export default ProductsPage;

import React, { Component } from 'react';

// import axios from 'axios';

import Products from '../../components/Products/Products';

import Paginator from '../../components/Paginator/Paginator';


import BSON from 'bson';




// import { App } from 'realm';


// import * as Realm from 'realm';



// import * as Realm from 'realm-web';


// const id = 'application-0-acjfk'




// const config = {
//   id
// }




// let app = new Realm.App(config);







import { Stitch, RemoteMongoClient } from 'mongodb-stitch-browser-sdk';

import { AnonymousCredential } from 'mongodb-stitch-browser-sdk';










class ProductsPage extends Component {
  state = { isLoading: true, products: [], totalProducts: 0, productPage: 1 };







  componentDidMount() {
    // axios
    //   .get('http://localhost:3100/products')
    //   .then((productsResponse) => {
    //     console.log(productsResponse);
    //     this.setState({ isLoading: false, products: productsResponse.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ isLoading: false, products: [] });
    //     this.props.onError('Loading products failed. Please try again later.');
    //     console.log(err);
    //   });


    this.fetchData();

    console.log(this.state.totalProducts);
  }

  fetchData = (direction) => {
    const mongodb = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');

    console.log(mongodb, 'LINE');

  //  const mongodb = Realm.User.mongoClient(); ///approach novo...


  //  mongodb.db('shop2').collection('products').find().iterator ///
  

  mongodb.db('shop2').collection('products').find().asArray()
  .then(
    (products) => {
          this.setState({products: products, isLoading: false})
    }
  )
  .catch(
    (err) => {
      this.props.onError('Fetching the products failed. Please try again later.');
    }
  )

    // if (direction) {
    //   this.setState({ postsLoading: true, posts: [] });
    // }

    // let page = this.state.productPage;

    // if (direction === 'next') {
    //   page++;
    //   this.setState({ productPage: page });
    // }

    // if (direction === 'previous') {
    //   page--;
    //   this.setState({ postPage: page });
    // }


    // axios
    //   // .get('http://localhost:3100/products?page=1')
    //   .get(`http://localhost:3100/products?page=${page}`)
    //   .then((productsResponse) => {
    //     console.log(productsResponse);
    //     this.setState({ isLoading: false, 
    //       products: productsResponse.data.products, 
    //       totalProducts: productsResponse.data.totalProducts, 
    //       productPage: productsResponse.data.currentPage  });
    //       console.log(this.state);
    //   })
    //   .catch((err) => {
    //     this.setState({ isLoading: false, products: [] });
    //     this.props.onError('Loading products failed. Please try again later.');
    //     console.log(err);
    //   });




    



  
  };

  productDeleteHandler = (productId) => {
    // console.log(productId);
    // axios
    //   .delete('http://localhost:3100/products/' + productId)
    //   .then(
    //     () => {
    //     // this.setState((prevState) => {
    //     //   const products = [...prevState.products];
    //     //   const updatedProducts = products.filter((product) => {
    //     //     return product._id !== productId;
    //     //   });
    //     //   return {
    //     //     isLoading: false,
    //     //     products: updatedProducts,
    //     //   };
    //     // });
    //     this.fetchData()
    //   })
    //   .catch((err) => {
    //     this.props.onError(
    //       'Deleting the product failed. Please try again later.'
    //     );
    //     console.log(err);
    //   });

    console.log('DELETE_TRY');
    const mongodb = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas');


    mongodb.db('shop2').collection('products').deleteOne(
      {
        // _id: ObjectId(productId) //import de 'ObjectId' falhou... --> e nós NÃO PRECISAMOS DE 'ObjectId()', esse wrapper aí, EM APPS QUE USAM O STITCH, PQ ESSA CONVERSÃO DA STRING EM OBJECTID JÁ É FEITA AUTOMATICAMENTE NO STITCH...
        ////new BSON.objectId(productId); //fix '''antigo''' (é a maneira de converter uma STRING EM UM OBJECTID, NO __ BROWSER, E NÃO NO BACKEND/node)...
        _id: productId
      }
    )
    .then(
      () => {
            this.fetchData()
      }
    )
    .catch(
      (err) => {
        this.props.onError('Deleting the product failed. Please try again later.');
      }
    )










  };

  render() {
    let content = <p>Loading products...</p>;

    if (!this.state.isLoading && this.state.products.length > 0) {
      content = (
        <Paginator
        onPrevious={this.fetchData.bind(this, 'previous')}
        onNext={this.fetchData.bind(this, 'next')}
        lastPage={Math.ceil(this.state.totalProducts / 5)}
        currentPage={this.state.productPage}
        >
        <Products
          products={this.state.products}
          onDeleteProduct={this.productDeleteHandler}
        />
        </Paginator>
      );
    }

    if (!this.state.isLoading && this.state.products.length === 0) {
      content = <p>Found no products. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default ProductsPage;
