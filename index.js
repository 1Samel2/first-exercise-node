/* Tarefas dessa aula:
- [_] Criar Rota(put):
---[_] Configurar nova requisição(insomnia, ou similar);
---[_] Obter o id;
---[_] Obter informações a serem atualizadas (name e age) pelo body;
---[_] Criar objeto com as informações atualizadas;
---[_] Descobrir o index do id fornecido;
---[_] Retornar status 404 e mensagem de "User not found", no caso de o id não existir dentro do array;
---[_] Inserir usuário atualizado dentro do array;
---[_] Retornar usuário atualizado. */



const express = require('express')
const cors = require('cors')
const port = 3001
const app = express()
app.use(express.json()) /* usar esse use sempre quando for utilizar body antigo */
app.use(cors())
const uuid = require('uuid')


const users = []/*  nunca usar isso para armazenzar < */

const checkUserId = (request, response, next) => {

    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users:id', checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = { id, name, age }
    users[index] = updatedUser
    return response.json(updatedUser)

})

app.delete('/users:id', checkUserId, (request, response) => {
    const index = request.userIndex
    users.splice(index, 1)
    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`👍 Algum dia irá da certo ${port}`)
})



