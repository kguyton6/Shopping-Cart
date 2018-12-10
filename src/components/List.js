import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const Wrapper = styled.div`
  font-size: 16px;
  color: black;
  height: auto;
  width: 60%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  text-decoration: none;

`;




class List extends React.Component {


    render(){
        const { product } = this.props
        return (     
          <Wrapper key={product.product_id} {...this.props}> 
          <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'space-evenly'}}>
          <li >{product.product}</li>
          <li >{product.description}</li>
          <li >{product.price}</li> <br />
          <img src={product.image} alt="img"  width='150px' height='150px'/>
          <Button {...this.props} onClick={this.props.onClick}>{this.props.name}</Button>
          </div>
         </Wrapper>
        )
    }
}

export default List