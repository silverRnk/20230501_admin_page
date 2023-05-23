import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display:flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 20px;
  background-color: white;`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
`

const Form = styled.form``

const FieldContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;`

const InputItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;`

const Label = styled.label`
  overflow: hidden;
  text-overflow: ellipsis;`

const Input = styled.input`
  height: 50px;
  padding: 5px 10px;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  
  &:focus {
    background-color: white;
  }`

const Selection = styled.select`
  height: 50px;
  padding: 5px 10px;
  background-color: lightgray;
  border: none;
  border-radius: 5px;
  
  &:focus {
    background-color: white;
  }`

const Option = styled.option``

const ButtonContainer = styled.div`
  margin-bottom: 75px;`

const Button = styled.button`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin-right: 10px;
  padding: 7px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${props => props.type === 'reset'? 'blue' : 'red'}`

function StudentPromotions() {
  return (
    <Container>
    <Title>Student Promotion</Title>

    <Form>
      <FieldContainer>
        <InputItem>
          <Label>Name</Label>
          <Input type='text' />
        </InputItem>

        <InputItem>
          <Label>Current Class</Label>
          <Selection placeholder='Please Select Class'>
            <Option selected value={''}>Please Select Class</Option>
          
          </Selection>
        </InputItem>

        <InputItem>
          <Label>Promotion From Class</Label>
          <Selection placeholder='Please Select Class'>
            <Option selected value={''}>Select Class</Option>
          
          </Selection>
        </InputItem>

        <InputItem>
          <Label>Promotion To Class</Label>
          <Selection placeholder='Please Select Class'>
            <Option selected value={''}>Select Class</Option>
          
          </Selection>
        </InputItem>
      </FieldContainer>

      <ButtonContainer>
      <Button>Save</Button>
      <Button type='reset'>Reset</Button>
      </ButtonContainer>
    
    </Form>
    </Container>
  )
}

export default StudentPromotions