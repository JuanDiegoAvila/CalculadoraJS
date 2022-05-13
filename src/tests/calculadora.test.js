import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculadora from '../calculadora'

it('Al ingresar numeros con decimales y exceder 9 digitos tira error. ', async() => {
  render(<Calculadora />)
  const element = screen.getByText('9')
  expect(element).toBeInTheDocument()
  // Se presiona 10 veces pero deveria aparecer solo 9
  for (let i = 0; i< 10; i++) {
    await userEvent.click(element)
  }
  expect(screen.getByText('999999999')).toBeInTheDocument()
})

it('Si un resultado tiene mas de 9 digitos, se ve mensaje de error. ', async() => {
  render(<Calculadora />)
  const element1 = screen.getByText('1')
  expect(element1).toBeInTheDocument()
  const element0 = screen.getByText('0')
  expect(element0).toBeInTheDocument()
  const elementX = screen.getByText('x')
  expect(elementX).toBeInTheDocument()
  const elementI = screen.getByText('=')
  expect(elementI).toBeInTheDocument()
  // Se selecciona el numero 100000000
  await userEvent.click(element1)
  for(let i = 0; i < 8; i++){
    await userEvent.click(element0)
  }
  // Se elije la multiplicacion
  await userEvent.click(elementX)
  // Se multiplica por 10
  await userEvent.click(element1)
  await userEvent.click(element0)
  // Se selecciona = 
  await userEvent.click(elementI)
  expect(screen.getByText('ERROR')).toBeInTheDocument()
})

it('Si en una division el resultado tiene mas de 9 digitos y es decimal tira error.', async() => {
  render(<Calculadora />)
  const element8 = screen.getByText('8')
  expect(element8).toBeInTheDocument()
  const element9 = screen.getByText('9')
  expect(element9).toBeInTheDocument()
  const elementD = screen.getByText('÷')
  expect(elementD).toBeInTheDocument()
  const elementI = screen.getByText('=')
  expect(elementI).toBeInTheDocument()
  // Se selecciona el numero 8
  await userEvent.click(element8)
  // Se selecciona la division
  await userEvent.click(elementD)
  /// Se selecciona el numero 9
  await userEvent.click(element9)
  // Se selecciona = 
  await userEvent.click(elementI)
  expect(screen.getByText('ERROR')).toBeInTheDocument()
})

it('Que la funcion de +/- si modifique el valor y funcione dentro de una operacion aritmetica.', async() => {
  render(<Calculadora />)
  const element9 = screen.getByText('9')
  expect(element9).toBeInTheDocument()
  const elementMM = screen.getByText('±')
  expect(elementMM).toBeInTheDocument()
  const elementM = screen.getByText('+')
  expect(elementM).toBeInTheDocument()
  const element1 = screen.getByText('1')
  expect(element1).toBeInTheDocument()
  const elementI = screen.getByText('=')
  expect(elementI).toBeInTheDocument()
  // Se selecciona el numero 9
  await userEvent.click(element9)
  // Se mas menos para convertir en negativo
  await userEvent.click(elementMM)
  // Se selecciona la suma
  await userEvent.click(elementM)
  // Se selecciona el numero 1
  await userEvent.click(element1)
  // Se selecciona = 
  await userEvent.click(elementI)
  expect(screen.getByText('-8')).toBeInTheDocument()
})