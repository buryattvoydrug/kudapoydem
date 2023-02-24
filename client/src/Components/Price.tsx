import React from 'react'

export default function Price({value, maxValue}: {value: number; maxValue: number}) {
  return (
    <>
        <ul>
            {[...Array(value)].map((item, index) => (
                <img key={index} src={require('../assets/images/price.png')} alt="" />
            ))}
            {[...Array(maxValue - value)].map((item, index) => (
                <img key={index} style={{"opacity":'0.2'}} src={require('../assets/images/price.png')} alt="" />
            ))}
        </ul>
    </>
  )
}
