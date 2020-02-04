import React from 'react'
import axios from 'axios'

const urlService = process.env.REACT_APP_PESSOA_SERVICE_URL + "/pessoas"

const initPessoa = () => ({
    id: 0,
    name: '',
    age: '',
    password: ''
})


const Pessoa = ({pessoas, setPessoas, newPessoa, setNewPessoa, editarPessoa, setEditarPessoa, updatePessoas}) => {

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
            axios.put(urlService + "/" + newPessoa.id, newPessoa).then(response => {
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

    const cancelarEdicao = () => {
        setEditarPessoa(false)
        setNewPessoa(initPessoa)
    }

    return (
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
                <button onClick={cancelarEdicao}>Cancelar</button>
            }
        </form>
    )
}

export default Pessoa
export {Pessoa, initPessoa}