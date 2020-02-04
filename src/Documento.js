import React, { useState } from 'react'
import axios from 'axios'

const urlBase =  process.env.REACT_APP_PESSOA_SERVICE_URL + '/documentos'

const initDocumento = {
    content: '',
    important: false
}

const Documento = ({token, doc}) => {
    const [documento, setDocumento] = useState(initDocumento)

    const config = {    
        headers: { Authorization: "bearer " + token.token }, 
    }

    const saveDocumentoHandler = (event) => {
        event.preventDefault()

        axios.post(urlBase, {...documento, pessoa: token.id}, config).then(response => {
            setDocumento(initDocumento)
            doc.current.toggleVisibility()
        })
    }

    const contentHandler = (event) => {
        setDocumento({ ...documento, content: event.target.value })
    }

    const importantHandler = (event) => {
        setDocumento({ ...documento, important: event.target.value })
    }

    return (
        <div>
            <h1>Adicionar Documento</h1>
            <form onSubmit={saveDocumentoHandler}>
                <div>
                    <label>Name: </label><input onChange={contentHandler}></input>
                </div>
                <div>
                    <label>Importante: </label><input type='checkbox' onChange={importantHandler}></input>
                </div>
                <div>
                    <button type='submit'>Gravar</button>
                </div>
            </form>
        </div>
    )
}

export default Documento