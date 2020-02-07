import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    const spread =
        {
            type,
            value,
            onChange
        }

    return {
        spread,
        reset
    }
}

export const useAnother = () => {
    const show = () => {
        console.log('USEANOTHER')
    }

    return {
        show
    }
}