import React, { useState } from 'react'
import Button from './Button'

const useCounter = () => {
    const [value, setValue] = useState(0)

    const increase = () => {
        setValue(value + 1)
    }

    const decrease = () => {
        setValue(value - 1)
    }

    const zero = () => {
        setValue(0)
    }

    return {
        value,
        increase,
        decrease,
        zero
    }
}

const Counter = ({ manager }) => {
    return (
        <>
            <p>Count number: {manager.value}</p>
            <Button name='+' listener={() => manager.increase() } />
        </>
    )
}

export default Counter
export { useCounter }