import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
import App from './App'

const token = {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9hbyIsImlkIjoiNWUzMmY0MWQxZmQ1MmM1YjhiNTMwNjI3IiwiaWF0IjoxNTgwOTkyMzUzfQ.lzMHUjFXzkVaX6P82r1Kln-6-Ftm0hP-VpC__gxBZHc",
    "id": "5e32f41d1fd52c5b8b530627",
    "name": "Joao"
}

describe('<App/>', () => {
    beforeEach(() => {
        window.localStorage.clear()
        window.localStorage.setItem('token', JSON.stringify(token.toString()))
    })

    test('render all pessoas', async () => {
        const component = render(
            <App/>
        )
        await waitForElement(() => component.container.querySelector('.pessoa'))

        const pessoas = component.container.querySelector('.pessoa')
        expect(pessoas.length).toBe(4)

    })
})