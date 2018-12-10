import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from './Header'
import cart from './assets/cart.png'
import house from './assets/house.png'
import List from './List'
import { connect } from 'react-redux'
import { getUserInfo } from '../ducks/reducer'
import image from './assets/close.png'

const Container = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  height: 100vh;
  align-items: center;


`
const Title = styled.h1`
font-size: 32px;
font-weight: bold;
text-align: center;
letter-spacing: 1px;
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
margin-top: 50px;
`
const Icon = styled.img`
position: absolute;
  height: 50px;
  width: 60px;
  background-repeat: no-repeat;
  background-size: 50px;
  right: 0%;
  cursor: pointer;

`
const Wrapper = styled.div`
  width: 80%;
  height: 350px;
  display: flex;
  margin-right: 3%;
  overflow: scroll;


`
const Input = styled.input`
  width: 25px;
  font-size: 14px;
  position: relative;
  margin-left: 5%;
  text-decoration: none;
  height: 25px;

`
const Img = styled.img`
    margin-left: 10px;
    cursor: point;
`

const CheckOut = styled.button`
    width: ${props => props.width || '60%'};
    height: ${props => props.height || '40px'};
    background-color:${props => props.background  || 'rgb(38, 240, 206)'};
    box-shadow: ${props => props.shadow || '1px 1.5px 1.5px 1px rgb(133, 133, 133)'};
    border: none;
    font-size: 22px;
    color:black;
    font-weight: bold; 
    letter-spacing: 2px; 
    position: ${props => props.position || 'unset'};
    bottom: ${props => props.bottom};
    right: ${props => props.right};
`

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
      shoppingCart: [],
      showCart: false,
      icon: { cart },
      user: [],
      count: 1,
      items: 0

    }

    this.updateCart = this.updateCart.bind(this)
  }

  componentDidMount = () => {
    axios.get("/api/products")
      .then((res) => {
        this.setState({ products: res.data })
      },
        axios.get('/api/cart')
          .then(res => {
            this.setState({ shoppingCart: res.data })
          },
            axios.get('/session')
              .then(res => this.setState({ user: res.data }))

          ))
  }



  addToCart = (id) => {
    console.log(id)
    axios.post(`/api/cart/${id}`)
      .then((res) => {
        console.log(res.data)
        this.setState({ shoppingCart: res.data })
      })
  }

  updateCart = (id) => {
    console.log(this.state.count, id)
    axios.put(`/api/cart/${id}`, { count: this.state.count })
      .then((res) => {
        this.setState({ shoppingCart: res.data })
      })
  }


  updateCount = (value) => {
    console.log(value)
    this.setState({ count: value })
  }

  showProducts = () => {
    let products = this.state.products;
    let product = [];
    for (let i in products) {
      product.push(
        <React.Fragment>
          <List
            product={products[i]}
            onClick={() => this.addToCart(products[i].product_id)}
            name={'Add+'} />

        </React.Fragment>
      )
    }
    return product
  }

  showCart = () => {
    let product = []
    if (this.state.shoppingCart.length > 0) {
      let products = this.state.shoppingCart
      for (let i in products) {
        product.push(
          <React.Fragment>
            <List product={products[i]}
              onClick={() => this.updateCart(products[i].product_id)}
              name={'Update'} />
            <Input defaultValue={products[i].quantity} onChange={(e) => this.updateCount(e.target.value)} />
            <Img width='5px' height='5px' src={image} alt='x' onClick={() => this.deleteItem(products[i].id)} />
          </React.Fragment>
        )
      }
      return product
    }
  }

  deleteCart = () => {
    axios.delete('/api/delete')
      .then((res) => {
        this.setState({ shoppingCart: res.data })
      })
  }
  deleteItem = (id) => {
    axios.delete(`/api/delete/${id}`)
      .then((res) => this.setState({ shoppingCart: res.data }))
  }
  render() {
    console.log(this.props.user, this.state)
    return (

      <Container>
        <Header
          Button={CheckOut}
          reload={this.componentDidMount}
        >
          {this.state.showCart ?
            <Icon src={house} onClick={() => this.setState({ showCart: false })} /> :
            <Icon src={cart} onClick={() => this.setState({ showCart: true })} />}
        </Header>

        {this.state.showCart ?
          <React.Fragment>
            <Title>{this.state.shoppingCart.length > 0 ? 'Your Cart' : 'Cart is empty'}</Title>
            <Wrapper>
              {this.showCart()}
              <CheckOut 
              width='150px' 
              position='absolute' 
              bottom='10%'
              right='5%'
              background='white'

              onClick={this.deleteCart}>Check Out</CheckOut>
            </Wrapper>
          </React.Fragment> :
          <React.Fragment>
            <Title>Products</Title>
            <Wrapper>
              {this.showProducts()}
            </Wrapper>
          </React.Fragment>}

      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const actionCreators = { getUserInfo }
export default connect(mapStateToProps, actionCreators)(Home)