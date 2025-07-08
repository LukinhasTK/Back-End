import express from 'express'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.listen(3000, () => {
  console.log('Server iniciado na porta 3000')
});

try {
app.get('/usuarios', async (req, res) => {

  const users = await prisma.user.findMany()
  res.status(200).json(users)
})} catch (err) {
  res.status(500).json({ error: err.message })
}

try {
app.post('/usuarios', async (req, res) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email
    }
  });
  res.status(201).json(user)
})} catch (err) {
  res.status(500).json({ error: err.message })
}

try {
  app.put('/usuarios/:id', async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email
    },
  });
  res.status(200).json(user)
})
} catch (err) {
  res.status(500).json({ error: err.message })
}

try {
  app.delete('/usuarios/:id', async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(user).json({ message: 'Usuário deletado com sucesso' })
});
} catch (err) {
  res.status(500).json({ error: err.message })
}





