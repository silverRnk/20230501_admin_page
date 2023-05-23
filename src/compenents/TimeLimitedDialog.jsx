import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height:100px;
    width: max(300px, auto);
    padding: 10px 20px;
    display: ${props=> props.open? 'flex': 'none'};
    align-items: center;
    justify-content: center;
    position: fixed;
    background-color: white;
    box-shadow: 2px 2px 5px gray;
    top: 10%;
    left: calc(50% - 150px);
    border-radius: 5px;
    z-index: 2;`

const TimeLimitedDialog = ({open, duration = 1500, onTimeOut = () => {}, children, top, left, right, bottom}) => {

    setTimeout(() => {onTimeOut()}, duration)

  return (
    <Container id='time-limited-dialog' open={open}>
        {children}
    </Container>
  )
}

export default TimeLimitedDialog