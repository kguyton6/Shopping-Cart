import React from 'react'
import styled from 'styled-components'
import Button from './Button'



const Wrapper = styled.div`
  font-size: 16px;
  color: black;
  height: auto;
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  text-align: center;
  text-decoration: none;
  overflow: scroll;


`;

const Input = styled.input`
  width: 25px;
  font-size: 14px;
  position: relative;
  margin-left: 5%;
  text-decoration: none;
  height: 25px;

`


class List extends React.Component {


    render() {
        console.log(this.props)
        const { product } = this.props
        let total = product.price * product.quantity
        console.log(total)
        return (
            <Wrapper key={product.product_id} {...this.props}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 fontWeight='bold'>{product.product}</h4>
                    <li style={{ width: '100px', fontSize: '10px' }}>{product.description}</li>
                    <img src={product.image} alt="img" width='150px' height='150px' />
                    <li >{product.price}</li> <br />
                    <div style={{ display: 'flex' }}>
                        <Button {...this.props} onClick={this.props.onClick}>{this.props.name}</Button>
                        {this.props.showCart === true ?
                        <React.Fragment>
                  <Input id={product.product_id} type='number' placeholder={product.quantity} onChange={this.props.onChange} /> 
                </React.Fragment>
                : false }
                                  
                    </div>
                </div>
            </Wrapper>

        )
    }
}

export default List