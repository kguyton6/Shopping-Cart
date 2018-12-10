import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components'
// import ItemList from './ItemList'
// import Input from './Input'
// import Button from './Button'

const Wrapper = styled.div`
     display: flex;
     height: 75vh;
     width: 80%;
    overflow: scroll;
     box-shadow: 0 2px 2px 0 rgb(216, 216, 216);
     text-align: center;
      padding-top: 5%;

   `;

// const Title = styled.h1`
// font-size: 32px;
// font-weight: bold;
// text-align: center;
// letter-spacing: 1px;
// font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
// margin-top: 50px;
// `

const li = {
  color: 'black',
  fontSize: '16px',
  listStyle: 'none',
  margin: '3%',
  textDecoration: 'none'
}

class Cart extends Component {

  state = {
    cart: [],
    count: 0,
    disabled: true

  }

  componentDidMount = () => {
        axios.get('/api/cart')
          .then((res) => {
              this.setState({ cart: res.data })
          })  
  }

  updateCount = (value) => {
    this.setState({ count: value })
  }



  showCart = () => {
    var products = this.state.cart
    let product = [];
    for (let i in products) {
      product.push(
        <Wrapper >
          <ul key={products[i].id}>
            <li style={li}>{products[i].product}</li>
            <li style={li}>{products[i].description}</li>
            <li style={li}><img src={products[i].image} alt="img" /></li> <br />
            <li style={li}>{products[i].price}</li> <br />
          </ul>
          <button >
            Update Cart
          </button>
          <input  />
        </Wrapper>
      )
    }
    return product
  }
  deleteCart = () => {
    axios.delete('/api/cart')
      .then((res) => this.setState({ cart: res.data }))
  }


  render() {
    return (
      this.showCart()
    )
  }
}

export default Cart





// value={products[i].quantity}  count={this.updateCount}
// value={products[i].product_id} title='Update With Id' onClick={this.updateCart}