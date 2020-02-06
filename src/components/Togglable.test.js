import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'

test('renders content', () => {
    const content = 'Component testing is done with react-testing-library'

    const component = render(
        <Togglable buttonLabel='Toggle Teste'>
            {content}
        </Togglable>
    )

    const mainContent = component.container.querySelector('.togglable')

    component.debug(mainContent)

    // method 1
    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )

    // method 2
    const element = component.getByText(
        'Component testing is done with react-testing-library'
    )
    expect(element).toBeDefined()

    // method 3
    const div = component.container.querySelector('.togglable')
    expect(div).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
})

describe('<Togglable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv" />
            </Togglable>
        )
    })

    test('renders its children', () => {
        component.container.querySelector('.testDiv')
    })

    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    test('toggled content can be closed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const buttonCancel = component.getByText('cancel')
        fireEvent.click(buttonCancel)

        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})