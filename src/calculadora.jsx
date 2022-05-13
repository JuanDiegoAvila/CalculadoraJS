import './calculadora.css'
import React, { useState } from 'react'
import Boton from './Boton'

const Calculadora = () => {
  const numeros = ['AC', 'DEL', '±', '÷', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '%', '=']
  const [clicked, setClicked] = useState([])
  const [operacion, setOperacion] = useState([false, ''])
  const [primer, setPrimer] = useState('')

  const changeText = (character) => {
    let old = [...clicked]
    switch (character) {
      case 'DEL':
        old.pop(character)
        break
      case 'AC':
        setPrimer('')
        old = []
        break
      default:
        if (clicked.length <= 9) {
          if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '±'].includes(character)) {
            if (clicked.length !== 9) {
              if (operacion[0]) {
                old = []
                setOperacion([false, operacion[1]])
              }
              if (!old.includes('.') && character === '.') {
                old.push(character)
              } else {
                old.push(character)
              }
              let uno = 0
              switch (character) {
                case '±':
                  uno = clicked.join('').includes('.') ? parseFloat(clicked.join(''))
                    : parseInt(clicked.join(''), 10)
                  old = ((uno * -1).toString())
                  break
                default:
                  break
              }
            }
          } else if (['x', '-', '+', '%', '=', '÷'].includes(character)) {
            old = []
            if (primer === '') {
              setPrimer(clicked.join(''))
            } else {
              const segundo = clicked.join('')
              let uno = 0
              let dos = 0
              let resultado = ''
              switch (operacion[1]) {
                case 'x':
                  uno = primer.includes('.') ? parseFloat(primer) : parseInt(primer, 10)
                  dos = segundo.includes('.') ? parseFloat(segundo) : parseInt(segundo, 10)

                  resultado = String(uno * dos)

                  if (resultado.length <= 9) {
                    old.push(uno * dos)
                    setPrimer((uno * dos).toString())
                  } else {
                    old.push('ERROR')
                    setPrimer('ERROR')
                  }
                  break
                case '÷':
                  uno = primer.includes('.') ? parseFloat(primer) : parseInt(primer, 10)
                  dos = segundo.includes('.') ? parseFloat(segundo) : parseInt(segundo, 10)

                  resultado = String(uno / dos)

                  if (resultado.length <= 9) {
                    old.push(uno / dos)
                    setPrimer((uno / dos).toString())
                  } else {
                    old.push('ERROR')
                    setPrimer('ERROR')
                  }
                  break
                case '-':
                  uno = primer.includes('.') ? parseFloat(primer, 10) : parseInt(primer, 10)
                  dos = segundo.includes('.') ? parseFloat(segundo, 10) : parseInt(segundo, 10)

                  resultado = String(uno - dos)

                  if (resultado.length <= 9) {
                    old.push(uno - dos)
                    setPrimer((uno - dos).toString())
                  } else {
                    old.push('ERROR')
                    setPrimer('ERROR')
                  }
                  break
                case '+':
                  uno = primer.includes('.') ? parseFloat(primer, 10) : parseInt(primer, 10)
                  dos = segundo.includes('.') ? parseFloat(segundo, 10) : parseInt(segundo, 10)

                  resultado = String(uno + dos)

                  if (resultado.length <= 9) {
                    old.push(uno + dos)
                    setPrimer((uno + dos).toString())
                  } else {
                    old.push('ERROR')
                    setPrimer('ERROR')
                  }
                  break
                case '%':
                  uno = primer.includes('.') ? parseFloat(primer, 10) : parseInt(primer, 10)
                  dos = segundo.includes('.') ? parseFloat(segundo, 10) : parseInt(segundo, 10)

                  resultado = String(uno % dos)

                  if (resultado.length <= 9) {
                    old.push(uno % dos)
                    setPrimer((uno % dos).toString())
                  } else {
                    old.push('ERROR')
                    setPrimer('ERROR')
                  }
                  break
                default:
                  break
              }
            }
            setOperacion([true, character])
          }
        }
    }
    setClicked([...old])
  }

  return (
    <div className="calculadora-container">
      <div className="pantalla">
        <h1>{clicked.join('')}</h1>
      </div>
      <div className="numeros-container">
        <div className="number-grid">
          {
            numeros.map((numero) => (
              <Boton key={numero} valor={numero} changeText={changeText} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Calculadora
