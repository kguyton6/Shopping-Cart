import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 25px;
  font-size: 14px;
  position: relative;
  margin-left: 5%;
  text-decoration: none;
  height: 25px;

`


class Input extends React.Component {
    state = {
        disabled: true,
        value: null

    }
   
    render(){

        return (

            <input style={StyledInput} onChange={this.props.updateCount} {...this.props} >
               {this.props.children}
            </input>
        )
    }
}

export default Input