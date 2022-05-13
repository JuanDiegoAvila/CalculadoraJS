import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Boton from '../Boton'

it('Render de la calculadora en el documento ', () => {
  ///
  render(<Boton valor='+' changeText={ () => {} } />)
  const element = screen.getByText('+')
  expect(element).toBeInTheDocument()
})