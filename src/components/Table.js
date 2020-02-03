import React from 'react'
import Button from './Button'

const Table = ({ structure, content}) => {
    //const structure = Object.keys(content[0])

    const renderStructure = () => (
        <thead>
            <tr>
                {structure.map((cell, i) => renderCell(Object.keys(cell)[0], i))}
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
        } else if (att.structure) {
            return renderCell(<Table structure={att.structure} content={row[Object.values(att)[0]]}/>)
        } else {
            return renderCell(row[Object.values(att)[0]], i)
        }
    }

    const renderContent = () => (
        <tbody>
            {content.map((row, i) => renderRow(row, i))}
        </tbody>
    )

    const renderRow = (row, i) => {
        return (
            <tr key={i}>
                {structure.map((att, i) => renderCellByAtt(row, att, i))}
            </tr>
        )
    }

    return (
        <table>
            {renderStructure()}
            {content && content.length>0 && renderContent()}
        </table>
    )
}

export default Table