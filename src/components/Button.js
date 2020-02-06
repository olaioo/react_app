import React from 'react'

const Button = ({ name, listener }) => {
    return (
        <button onClick={listener}>{name}</button>
    )
}

export default Button