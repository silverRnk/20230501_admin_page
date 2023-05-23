import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 300px;
    height: 300px;
    background-color: white;`

const Title = styled.h3``

const Reminders = () => {
  return (
    <Container>
        <Title>Reminders</Title>
    </Container>
  )
}

export default Reminders