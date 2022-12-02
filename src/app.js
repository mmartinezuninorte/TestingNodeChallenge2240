import express from 'express'

const app = express()

app.use(express.json())

app.get('/tasks',(req, res)=>{
    res.status(200).json([])
})

app.post('/tasks', (req, res)=>{
    res.status(200).json([])
})

export default app