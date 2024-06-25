// test/user.test.js
require("dotenv").config()
const request = require('supertest');
const app = require("../index");
const mongoose = require('mongoose');
const { Types } = mongoose
const userService = require("../services/userServices")

describe('User API', () => {
    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.URI);
    });

    afterAll(async () => {
        // Close the database connection
        await mongoose.connection.close();
    });

    afterEach(async () => {
        // Clear the users collection after each test
        await userService.deleteAll();
    });

    test('should create a new user', async () => {
        const response = await request(app)
            .post('/worko/user')
            .send({
                email: 'test@example.com',
                name: 'Test User',
                age: 30,
                city: 'Test City',
                zipcode: '12345'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("success", true);
    });

    test('should list all users', async () => {
        await userService.createUser({ email: 'test1@example.com', name: 'Test User 1', age: 25, city: 'City 1', zipcode: '12345' });
        await userService.createUser({ email: 'test2@example.com', name: 'Test User 2', age: 35, city: 'City 2', zipcode: '67890' });

        const response = await request(app).get('/worko/user');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
    });

    test('should get user details', async () => {
        const user = await userService.createUser({ email: 'test3@example.com', name: 'Test User', age: 30, city: 'Test City', zipcode: '12345' });
        console.log(user._id)
        const response = await request(app).get(`/worko/user/user.user.id`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
    });

    test('should update a user', async () => {
        const user = await userService.createUser({ email: 'test4@example.com', name: 'Test User', age: 30, city: 'Test City', zipcode: '12345' });

        const response = await request(app)
            .put('/worko/user')
            .send({
                _id: user.data.user.id,
                email: 'updated@example.com',
                name: 'Updated User',
                age: 35,
                city: 'Updated City',
                zipcode: '67890'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
    });

    test('should partially update a user', async () => {
        const user = await userService.createUser({ email: 'test5@example.com', name: 'Test User', age: 30, city: 'Test City', zipcode: '12345' });

        const response = await request(app)
            .patch('/worko/user')
            .send({
                _id: user.data.user.id,
                email: 'updated@example.com',
                name: 'Updated User',
                age: 35,
                city: 'Updated City',
                zipcode: '67890'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
    });

    test('should soft delete a user', async () => {
        const user = await userService.createUser({ email: 'test6@example.com', name: 'Test User', age: 30, city: 'Test City', zipcode: '12345' });

        const response = await request(app).delete(`/worko/user/${user.data.user.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
    });
});
