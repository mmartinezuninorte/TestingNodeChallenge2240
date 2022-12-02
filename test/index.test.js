import app from '../src/app.js'
import request from 'supertest'


// De forma predeterminada NO halla errores (STATUS CODE 200)
// Debo recibir un vector
describe('GET "/tasks"', ()=>{

    test('Deberia responder statusCode 200 - Sin body', async ()=>{
        const response = await request(app).get('/tasks').send()
        expect(response.statusCode).toBe(200)
    })

    test('Deberia responder con un arreglo', async()=>{
        const response = await request(app).get('/tasks').send()
        expect(response.body).toBeInstanceOf(Array)
    })

})

//TDD (Test - Driven Development)


describe('POST /tasks',()=>{

    describe('Pruebas ofreciendo titulo y descripcion',()=>{
        const newTask= {
            title: "titulo testing",
            description: "descripcion testing"
        }
    
        test('Deberia responder statusCode 200 - con Body Valido', async()=>{
            const response = await request(app).post("/tasks").send(newTask)
            expect(response.statusCode).toBe(200)
        })
    
        test('Deberia responder con content-type JSON', async()=>{
            const response = await request(app).post("/tasks").send(newTask)
            expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
        })
    
        test('Deberia responder con un task ID llamado "id"', async()=>{
            const response = await request(app).post("/tasks").send(newTask)
            expect(response.body.id).toBeDefined()
        })
    })
    
    describe('Pruebas cuando titulo y/o descripcion faltan',()=>{
        test('Deberia responder statusCode 400 sin body', async()=>{
            const fields = [
                {},
                {title:"titulo testing"},
                {description: "description testing"}
            ]
            for (const body of fields){
                const response = await request(app).post('/tasks').send(body)
                expect(response.statusCode).toBe(400)
            } 
        })
    })

    // MINIMO ESFUERZO BASADO EN PRUEBAS
})
