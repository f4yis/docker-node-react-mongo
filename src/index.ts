import express from 'express'
import mongoose from 'mongoose'

const app = express()
const Last = mongoose.model('last', new mongoose.Schema({
    num: Date
})) 
app.get('/', async (req, res) => {
    await new Last({
        num: Date.now()
    }).save()
    res.send("ttt")
})
app.get('/get', async (req, res) => {
    let n = await Last.find().lean()
    res.json(n)
})

const PORT = Number(process.env.PORT || 8080)
app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`)
})

mongoose.connect(process.env.DATABASE_URL || '').then(r => {
    console.log('Connected')
}).catch(e => {
    console.log('error')
})