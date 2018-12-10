import React from 'react'
import Login from './Login'
import styled from 'styled-components'
import logo from './assets/logo.jpg'
import axios from 'axios'


const StyledHeader = styled.header`
  height: 150px;
  width: 100vw;
  background-color: transparent;
  position: absolute;
  box-shadow: 0 2px 2px 0 rgb(247, 248, 248);
    display: flex;
    position: relative;
    justify-content: space-between;
`;
const Img = styled.img `
    width: ${props => props.width || '15%'};
    height: ${props => props.height ||  '65%'};
    margin-top: ${props => props.marginTop || '30px'};
    margin-left: ${props => props.marginLeft || '5%'};
`
const loginContainer = {
    position: 'relative',
    width:  '20%',
    display: 'flex',
    justifyContent: 'space-between',
    height: '50px',
    marginTop: '3%',
    marginRight: '5%'

}

const Title = styled.h1 `
    font-size: 32px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 1px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    
`
class Header extends React.Component {
    state = {
        loginModal: false,
        

    }

    toggleModal = () => {
        this.setState(prevState => {
            return { loginModal: !prevState.loginModal}
        })
       return this.props.reload()
    }

    
    render() {
        const Button = this.props.Button
        return (
            <StyledHeader {...this.props}>
                <Img src={logo} alt='logo'                   
                />
                <div style={loginContainer} >
                <Login 
                 Button={Button}
                 toggleModal={this.toggleModal} 
                 loginModal={this.state.loginModal}
                 /> 
                <Button onClick={this.toggleModal}>Login</Button>
                {this.props.children}
                </div>

            </StyledHeader>
        )
    }
}

export default Header