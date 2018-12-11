import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

 
const StyledButton = styled.button`
background-color: rgb(194, 194, 194);
color: gray ;
width: ${props => props.width || '150px'};
height: 35px;
border-radius: 3px;
font-size: 16px;
position: ${props => props.position || 'unset'};

`


class Button extends React.Component {

 
    render(){
        return (
            <StyledButton>
                {this.props.children}
           </StyledButton>
        )
    }
}

export default Button
