import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from './components/Table'
import Button from './components/Button'

const urlService = process.env.SERVICE_URL + "/pessoas"

const initPessoa = {
    id: 0,
    name: '',
    age: ''
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

    useEffect(() => {
        updatePessoas(setPessoas)
    }, [])

    const newNomeHandler = (event) => {
        setNewPessoa({ ...newPessoa, name: event.target.value })
    }

    const newAgeHandler = (event) => {
        setNewPessoa({ ...newPessoa, age: event.target.value })
    }

    const addPessoa = (event) => {
        event.preventDefault()
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
            <h1>Pessoas {urlService}</h1>
            <div>
                <Table header={['ID', 'Nome', 'Idade', 'Editar', 'Deletar']}
                    rows={pessoas}
                    buttons={[{ name: 'editar', listener: editarPessoaHandler(pessoas, setNewPessoa, setEditarPessoa) }, { name: 'excluir', listener: delPessoaHandler(pessoas, setPessoas) }]} />
            </div>
            <h1>{editarPessoa ? 'Editar Pessoa' : 'Adicionar Pessoa'}</h1>
            <form onSubmit={addPessoa}>
                <div>
                    <label>Nome: </label><input onChange={newNomeHandler} value={newPessoa.name} />
                </div>
                <div>
                    <label>Age: </label><input onChange={newAgeHandler} value={newPessoa.age} />
                </div>
                <button type='submit'>Gravar</button>
                {editarPessoa ?
                    <button onClick={cancelarEdicao(setEditarPessoa, setNewPessoa)}>Cancelar</button>
                    : ''
                }
            </form>
        </div>
    )
}

export default App