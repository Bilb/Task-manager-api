const app = require('../src/app')
const request = require('supertest')
const Task = require('../src/models/task')
const { userOneId,
    userOne,
    setupDatabase,
    taskOne,
    taskTwo,
    taskThree,
    taskFour } = require('./fixtures/db')


beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'first task from test'
        })
        .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})


test('Should get a user task only', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
})


test('Should not delete not owned task', async () => {
    await request(app)
        .delete(`/tasks/${taskThree._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(404)

    const task = await Task.findById(taskThree._id)
    expect(task).not.toBeNull()
})