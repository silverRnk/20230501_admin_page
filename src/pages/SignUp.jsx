import React from 'react'
import { createRef } from 'react'
import styled from 'styled-components'
import { useStateContext } from '../context/ContextProvider'
import { useState } from 'react'
import axiosClient from '../utils/AxiosClient'
import { Navigate } from 'react-router-dom'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items:center;
    justify-content:center;
    background-color: rgb(254, 250, 225);
`

const SignUpContainer = styled.div`
    width: 30vw;
    height: 70vh;
    background-color: white;
`
const Title = styled.h1``
const InputContainer = styled.div`
    padding: 20px;
    display:flex;
    flex-direction:column;
    gap: 20px;`
const Input = styled.input`
    padding: 10px;
    font-size: 20px;
    border-radius: 5px;`
const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    border: none;
    margin-top: 20px;
`

export const SignUp = () => {
    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const passwordConfirmationRef = createRef()
    const {token , setToken, setUser} = useStateContext();
    const [errors, setErrors] = useState(null)

    if(token){
        return <Navigate to={'/'} />
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        console.log(payload)
        axiosClient.post('/signup', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err=> {
            const response = err.response;
            if (response && response.status === 422){
                console.log(response.data.errors)
            }
        })
        
    }
  return (
    <Container>
        <SignUpContainer>
            <form onSubmit={onSubmit}>
                
                <InputContainer>
                <Title>Add Admin</Title>
                <Input ref={nameRef} type="text" id='name' name='name' placeholder='Full Name' />
                <Input ref={emailRef} type="text" id='email' name='email' placeholder='Email Address' />
                <Input ref={passwordRef} type="password" id="password" name="password" placeholder='Password' />
                <Input ref={passwordConfirmationRef} type="password" id="repeatPassword" name="repeatPassword" placeholder='Repeat Password' />
                <Button>Sign Up</Button>
                </InputContainer>
                
            </form>
        </SignUpContainer>
    </Container>
  )
}
