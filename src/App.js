import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './Login'
import Table from './components/Table'
import Documento from './Documento'

const urlService = process.env.REACT_APP_PESSOA_SERVICE_URL + "/pessoas"

const initPessoa = {
    id: 0,
    name: '',
    age: '',
    password: ''
}

const delPessoaHandler = (pessoas, setPessoas) => (id) => () => {
    axios.delete(urlService+"/"+id).then(
        updatePessoas(setPessoas)
    )
}

const editarPessoaHandler = (pessoas, setNewPessoa, setEditarPessoa) => (id) => () => {
    setNewPessoa(pessoas.find(p => p.id === id))
    setEditarPessoa(true)
}

const cancelarEdicao = (setEditarPessoa, setNewPessoa) => () => {
    setEditarPessoa(false)
    setNewPessoa(initPessoa)
}

const updatePessoas = (setPessoas) => {
    axios.get(urlService).then(response => {
        console.log(response.data)
        setPessoas(response.data)
    })
}

const App = () => {
    const [pessoas, setPessoas] = useState([])
    const [newPessoa, setNewPessoa] = useState(initPessoa)
    const [editarPessoa, setEditarPessoa] = useState(false)
    const [token, setToken] = useState()

    useEffect(() => {
        updatePessoas(setPessoas)
    }, [])

    const newNomeHandler = (event) => {
        setNewPessoa({ ...newPessoa, name: event.target.value })
    }

    const newAgeHandler = (event) => {
        setNewPessoa({ ...newPessoa, age: event.target.value })
    }

    const newPasswordHandler = (event) => {
        setNewPessoa({ ...newPessoa, password: event.target.value })
    }

    const addPessoa = (event) => {
        event.preventDefault()
        console.log(urlService)
        if (editarPessoa) {
            axios.put(urlService+"/"+newPessoa.id, newPessoa).then(response =>{
                updatePessoas(setPessoas)
            })
            setEditarPessoa(false)
        } else {
            if (pessoas.some(p => p.name === newPessoa.name)) {
                alert('Nome já existe')
                return
            }
            newPessoa['id'] = Math.max(...pessoas.map(p => p.id), 0) + 1
            axios.post(urlService, newPessoa).then(response => {
                updatePessoas(setPessoas)
            })
        }
        setNewPessoa(initPessoa)
    }

    return (
        <div>
            {!token ? <>
                <h1>Login</h1>
                <Login setToken={setToken}/>
                </>
            : <>
            <h1>Pessoas</h1>
            <div>
                <Table content={pessoas}
                    structure={[{'ID': 'id'},
                                {'Nome': 'name'}, 
                                {'Idade': 'age'},
                                {'Documentos': 'documentos', 'structure': [{'ID': 'id'}, {'Conteúdo': 'content'}]},
                                {'Editar':'editar', 'buttonListener': editarPessoaHandler(pessoas, setNewPessoa, setEditarPessoa)}, 
                                {'Deletar':'excluir', 'buttonListener': delPessoaHandler(pessoas, setPessoas)}
                                ]}/>
            </div>
            <h1>{editarPessoa ? 'Editar Pessoa' : 'Adicionar Pessoa'}</h1>
            <form onSubmit={addPessoa}>
                <div>
                    <label>Nome: </label><input onChange={newNomeHandler} value={newPessoa.name} />
                </div>
                <div>
                    <label>Age: </label><input onChange={newAgeHandler} value={newPessoa.age} />
                </div>
                {!editarPessoa && <div>
                    <label>Password: </label><input type='password' onChange={newPasswordHandler} value={newPessoa.password} />
                </div>}
                <button type='submit'>Gravar</button>
                {editarPessoa &&
                    <button onClick={cancelarEdicao(setEditarPessoa, setNewPessoa)}>Cancelar</button>
                }
            </form>
            <Documento token={token}/> </>
            }
        </div>

    )
}

export default App