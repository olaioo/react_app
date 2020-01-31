import React from 'react'
import Button from './Button'

const Table = ({ header, rows, buttons}) => {
    //const header = Object.keys(rows[0])

    const renderHeader = () => (
        <thead>
            <tr>
                {header.map((cell, i) => renderCell(Object.keys(cell)[0], i))}
            </tr>
        </thead>
    )

    const renderCell = (content, i) => (
        <td key={i}>
            {content}
        </td>
    )

    const renderCellByAtt = (row, att, i) => {
        if (att.buttonListener) {
            return renderCell(<Button listener={att.buttonListener(row.id)} name={Object.values(att)[0]}/>,i)
        } else {
            return renderCell(row[Object.values(att)[0]], i)
        }
    }

    const renderRows = () => (
        <tbody>
            {rows.map((row, i) => renderRow(row, i))}
        </tbody>
    )

    const renderRow = (row, i) => {
        return (
            <tr key={i}>
                {header.map((att, i) => renderCellByAtt(row, att, i))}
            </tr>
        )
    }

    return (
        <table>
            {renderHeader()}
            {rows.length>0 && renderRows()}
        </table>
    )
}

export default Table