import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './Login'
import Table from './components/Table'
import Documento from './Documento'
import Togglable from './components/Togglable'
import Pessoa, { initPessoa } from './Pessoa'

const urlService = process.env.REACT_APP_PESSOA_SERVICE_URL + '/pessoas'

const delPessoaHandler = (pessoas, setPessoas) => (id) => () => {
    if (window.confirm('Confimar a exclusão?')) {
        axios.delete(urlService + '/' + id).then(
            updatePessoas(setPessoas)
        )
    }
}

const editarPessoaHandler = (pessoas, setNewPessoa, setEditarPessoa) => (id) => () => {
    setNewPessoa(pessoas.find(p => p.id === id))
    setEditarPessoa(true)
}

const updatePessoas = (setPessoas) => {
    axios.get(urlService).then(response => {
        console.log(response.data)
        setPessoas(response.data)
    })
}

const clearLoggedUser = (setToken) => () => {
    setToken(undefined)
    window.localStorage.clear()
}

const App = () => {
    const [pessoas, setPessoas] = useState([])
    const [newPessoa, setNewPessoa] = useState(initPessoa)
    const [editarPessoa, setEditarPessoa] = useState(false)
    const [token, setToken] = useState()
    const documentoFormRef = React.createRef()

    useEffect(() => {
        setToken(JSON.parse(window.localStorage.getItem('token')))
        updatePessoas(setPessoas)
    }, [])

    return (
        <div>
            <h1>Login</h1>
            {!token ? <>
                <Login setToken={setToken} />
            </>
                : <>
                    <label>{token['name']}</label> <button onClick={clearLoggedUser(setToken)}>logout</button>
                    <h1>Pessoas</h1>
                    <div>
                        <Table content={pessoas}
                            structure={[{ 'ID': 'id' },
                                { 'Nome': 'name' },
                                { 'Idade': 'age' },
                                { 'Documentos': 'documentos', 'structure': [{ 'ID': 'id' }, { 'Conteúdo': 'content' }] },
                                { 'Editar': 'editar', 'buttonListener': editarPessoaHandler(pessoas, setNewPessoa, setEditarPessoa) },
                                { 'Deletar': 'excluir', 'buttonListener': delPessoaHandler(pessoas, setPessoas) }
                            ]} />
                    </div>
                    <h1>{editarPessoa ? 'Editar Pessoa' : 'Adicionar Pessoa'}</h1>
                    <Pessoa pessoas={pessoas} setPessoas={setPessoas} newPessoa={newPessoa} setNewPessoa={setNewPessoa} editarPessoa={editarPessoa} setEditarPessoa={setEditarPessoa} updatePessoas={updatePessoas}/>

                    <Togglable buttonLabel="Adicionar Documento" ref={documentoFormRef}>
                        <Documento token={token} doc={documentoFormRef} />
                    </Togglable>
                </>
            }
        </div>

    )
}

export default App