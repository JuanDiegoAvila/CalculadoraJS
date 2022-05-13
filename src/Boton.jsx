import React from 'react'
import './Boton.css'

import PropTypes from 'prop-types'

const Boton = ({ valor, changeText }) => {
  const Valor = valor

  return (
    <button type="button" className="button" onClick={() => { changeText(Valor) }}>
      {
        Valor
      }
    </button>
  )
}

Boton.propTypes = {
  valor: PropTypes.string.isRequired,
  changeText: PropTypes.func.isRequired,
}
export default Boton
