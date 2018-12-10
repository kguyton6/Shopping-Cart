import React from 'react'
import styled from 'styled-components'
import close from '../assets/close.png'


const Modal = styled.section`
    width: 100%;
    height: 100%;
    background-color: rgba(12, 12, 12, 0.931);
    position: fixed;
    z-index: 1000;
    top: 0px;
    right: 0px;
    bottom:0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 300px;
    height: 350px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    
`

class LoginModal extends React.Component {

    state = {
        disabled: false,
        color: 'black'
    }

    render() {
        console.log(this.props)

        return (
            <Modal>
                <Wrapper>
                <img src={close} alt='x' style={{
                        position: 'absolute',
                        right: '3%',
                        top: '3%'
                    }} onClick={this.props.onClose} />
                 {this.props.children} 
                </Wrapper>
            </Modal>
        )
    }
}

export default LoginModal