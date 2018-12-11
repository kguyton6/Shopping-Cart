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


const CounterBox = styled.span`
    color: black;
    /* font-weight: bold; */
    position: absolute;
  top: 5px;
  right: 0px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #ffffffea;
  border: black solid thin;
  z-index: 10;
  text-align: center;
  font-size: 13px;

  `
const Title = styled.h1`
font-size: 32px;
font-weight: bold;
text-align: center;
letter-spacing: 1px;
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
margin-top: 50px;
margin-bottom: 5%;
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

const Img = styled.img`
    margin-left: 10px;
    cursor: point;
`

const StyledButton = styled.button`
    width: ${props => props.width || '60%'};
    height: ${props => props.height || '40px'};
    background-color:${props => props.background || 'rgb(38, 240, 206)'};
    box-shadow: ${props => props.shadow || '1px 1.5px 1.5px 1px rgb(133, 133, 133)'};
    border: ${props => props.border || 'none'};
    font-size: 22px;
    color:${props => props.color || 'black'};
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
      quantity: [],
      count: 0



    }

    this.addToCart = this.addToCart.bind(this)
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
        <React.Fragment key={i}>
          <List
            product={products[i]}
            onClick={() => this.addToCart(products[i].product_id)}
            name={'Add+'} />

        </React.Fragment>
      )
    }
    return product
  }

  showCart = (count) => {
    let product = []
    if (this.state.shoppingCart.length > 0) {
      let products = this.state.shoppingCart
      for (let i in products) {
        var total = products[i].price * products[i].quantity
        product.push(
          <React.Fragment key={i}>
            <List product={products[i]}
              count={count}
              total={total}
              onClick={() => this.updateCart(products[i].product_id)}
              name={'Update'}
              quantity={products[i].quantity} 
              showCart={this.state.showCart} />
            <Img width='15px' height='15px' src={image} alt='x' onClick={() => this.deleteItem(products[i].id)} />
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


  total = (cart, total) => {
    var numbers = []
    for (let i in cart) {
      numbers.push(cart[i].quantity)

    }
    return numbers
  }

  getSum = (total, num) => {
    return total + Math.round(num);
  }


  render() {
    let num = this.total(this.state.shoppingCart)
    var newNum = num.reduce(this.getSum, 0)
    console.log(newNum)
    return (

      <Container>
        <Header
          Button={StyledButton}
          reload={this.componentDidMount}
        >
          {this.state.showCart ?
            <Icon src={house} onClick={() => this.setState({ showCart: false })} /> :
            <div style={{ position: 'relative' }}>
             {newNum > 0 ? <CounterBox>{newNum}</CounterBox> : false }
              <Icon src={cart} onClick={() => this.setState({ showCart: true })} />
            </div>}

        </Header>

        {this.state.showCart ?
          <React.Fragment>
            <Title>{this.state.shoppingCart.length > 0 ? 'Your Cart' : 'Cart is empty'}</Title>
            <Wrapper>
              {this.showCart(newNum)}
              <StyledButton
                className='styled-button'
                color='rgb(38, 240, 206)'
                width='150px'
                position='absolute'
                bottom='10%'
                right='5%'
                background='white'
                onClick={this.deleteCart}
              > Check Out</StyledButton>
            </Wrapper>
          </React.Fragment>
          :
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