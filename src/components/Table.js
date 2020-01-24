import React from 'react'
import Button from './Button'

const Table = ({ header, rows, buttons}) => {
    //const header = Object.keys(rows[0])

    const renderHeader = () => (
        <thead>
            <tr>
                {header.map((cell, i) => renderCell(cell, i))}
            </tr>
        </thead>
    )

    const renderCell = (content, i) => (
        <td key={i}>
            {content}
        </td>
    )

    const renderRows = () => (
        <tbody>
            {rows.map((row, i) => renderRow(row, i))}
        </tbody>
    )

    const renderRow = (row, i) => {
        buttons.forEach(button => {
            row={...row, ['button_'+button.name]: <Button listener={button.listener(row.id)} name={button.name}/>}
        })
        return (
            <tr key={i}>
                {Object.values(row).map((cell, i) => renderCell(cell, i))}
            </tr>
        )
    }

    return (
        <table>
            {renderHeader()}
            {rows.length>0? renderRows():null}
        </table>
    )
}

export default Table