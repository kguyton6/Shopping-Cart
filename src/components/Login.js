import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import LoginModal from './modal/LoginModal'
import {getUserInfo} from '../ducks/reducer'
import axios from 'axios'


const StyledHeader = styled.header`
    display: flex;
    justify-content: space-evenly;
    height: 50px;
    font-size: 1.5em;
    color: ${props => props.color || 'gray'};
    line-height: 75px;
    font-weight: bold;
`

const Input = styled.input`
    width: 80%;
    height: 40px;
    box-shadow: .5px 1px 1px .5px rgb(194, 194, 194);
    margin: 3%;
`
const styledText = {
    cursor: 'pointer',
    color: 'black',
    textDecorationLineStyle: 'solid',
    textDecorationLineColor: 'black'
}

const Wrapper = styled.div`
    width: 100%;
    height:80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

`

class Login extends Component {
    state = {
        email: '',
        password: '',
        disabled: true
    }

    login = () => {
        let {email, password} = this.state
        axios.post('/auth/login', {
            email, password })
        .then(res => this.props.getUserInfo(res.data))
            console.log(this.props.user)
    }
   

    showModal = () => {
        let Button = this.props.Button
        if(this.props.loginModal){
            return (
                <LoginModal onClose={this.props.toggleModal} >
                   <StyledHeader >
                        {this.state.disabled ?
                              <React.Fragment>
                                <span onClick={() => this.setState({ disabled: false })} >Sign Up</span>
                                <span style={styledText} >Login</span>
                            </React.Fragment> :
                              <React.Fragment>
                              <span style={styledText}>Sign Up</span>
                              <span onClick={() => this.setState({ disabled: true })} >Login</span>
                          </React.Fragment> 
                        }
                       
                    </StyledHeader>
                    <Wrapper>
                    <Input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder='Email' />
                    <Input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder='Password' />

                    <Button width='80%' shadow='0' onClick={this.login} >{!this.state.disabled ? 'Sign Up ' : 'Login' }</Button>                
             
                    </Wrapper>
                </LoginModal>
            )
        }
    }
  
    render() {
        return (
            <React.Fragment>
          {this.showModal()}
          </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const bindActionCreators = {getUserInfo}

export default connect(mapStateToProps, bindActionCreators)(Login)