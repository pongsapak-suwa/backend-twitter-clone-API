const request = require('supertest');
const app = require('../index');
const connectDB  = require('../config/dbConnect.js');
const mongoose = require('mongoose');
const User = require('../models/User');
const Feed = require('../models/Feed');

require("dotenv").config();

let token_user_1, token_user_2;

beforeAll(async () => {
    await connectDB();
    await request(app)
        .post('/auth/register')
        .send({ username: 'test_user_1', password: 'password' });

    const loginRes1 = await request(app)
        .post('/auth/login')
        .send({ username: 'test_user_1', password: 'password' });

    token_user_1 = loginRes1.body.accesstoken;

    await request(app)
        .post('/auth/register')
        .send({ username: 'test_user_2', password: 'password' });

    const loginRes2 = await request(app)
        .post('/auth/login')
        .send({ username: 'test_user_2', password: 'password' });

    token_user_2 = loginRes2.body.accesstoken;
});

afterAll(async () => {
    await User.deleteMany({});
    await Feed.deleteMany({});
    await mongoose.connection.close();
    await app.close();
});

describe('Register API', () => {
    it('Register a new user succeed', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'test_user_3', password: 'password' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Created user successfully');
    });

    it('Already have a username to register', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'test_user_1', password: 'password' });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('User with this already exists');
    });

    it('No req username and password', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({ username: 'test_user_1'});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('All fields are required');
    });
});

describe('Login and Logout API', () => {
    it('User login succeed', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'test_user_2', password: 'password' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accesstoken');
    });

    it('User login incorrect username or password', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'test_user_1', password: 'passwor' });
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('Invalid username or password. Please try again with the correct credentials.');
    });

    it('User login no req username and password', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ username: 'test_user_1'});
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('All fields are required');
    });

    it('User logout succeed', async () => {
        const res = await request(app)
            .delete('/auth/logout')
            .set('Authorization', `Bearer ${token_user_1}`)

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('successfully logged out');
    });
});

describe('User follow/unfollow API', () => {
    it('User follow another user', async () => {
        const user = await User.findOne({username:'test_user_2'});

        const res = await request(app)
            .put(`/api/follow/${user._id}`)
            .set('Authorization', `Bearer ${token_user_1}`)

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

    it('User unfollow another user', async () => {
        const user = await User.findOne({username:'test_user_2'});

        const res = await request(app)
            .put(`/api/unfollow/${user._id}`)
            .set('Authorization', `Bearer ${token_user_1}`)

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    });

    it('User not found', async () => {
        const res = await request(app)
            .put(`/api/follow/a4f3b8c9d276e5fa8b7c2f5a`)
            .set('Authorization', `Bearer ${token_user_1}`)

        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toBe('User Not Found.');
    });
});

describe('Feed API', () => {
    it('Create new tweet succeed', async () => {
        const res = await request(app)
            .post(`/api/tweet`)
            .set('Authorization', `Bearer ${token_user_1}`)
            .send({ text: 'test tweet text'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('feed_id');
    });

    it('Create new tweet but text over 200 characters', async () => {
        const longTweet = 'a'.repeat(201);
        const res = await request(app)
            .post(`/api/tweet`)
            .set('Authorization', `Bearer ${token_user_1}`)
            .send({ text: longTweet});

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toBe('text over 200.');
    });

    it('No req', async () => {
        const user = await User.findOne({username:'test_user_2'});

        const res = await request(app)
            .post(`/api/tweet`)
            .set('Authorization', `Bearer ${token_user_1}`)

            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe('field are required');
    });

    it('Get the message feed for the current user', async () => {
        const user1 = await User.findOne({username:'test_user_1'});
        const user2 = await User.findOne({username:'test_user_2'});
        await user1.follow(user2._id);

        await Feed.create({ user: user1._id, text:'text1' });
        await Feed.create({ user: user2._id, text:'text2' });

        const res = await request(app)
            .get(`/api/feed`)
            .set('Authorization', `Bearer ${token_user_1}`)

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('feed');
        expect(res.body.feed[0].text).toBe('text2');
        expect(res.body.feed[1].text).toBe('text1');
        expect(res.body.feed[2].text).toBe('test tweet text');
    });

});