const express = require('express');

const routes = express.Router();

const AdminController = require('./controllers/AdminController');
const AdminLoginController = require('./controllers/AdminLoginController');
const ParticipantController = require('./controllers/ParticipantController');
const ParticipantLoginController = require('./controllers/ParticipantLoginController');
const MessageController = require('./controllers/MessageController');

//rota cadastro de admin
routes.post('/admin', AdminController.store);
//rota login de admin
routes.post('/adminLogin', AdminLoginController.login);
//rota cadastro de participante
routes.post('/participant', ParticipantController.store);
//rota login de participante
routes.post('/participantLogin', ParticipantLoginController.login);
//rota cadastro de mensagem
routes.post('/message', MessageController.store);
//rota listagem de mensagens
routes.get('/message', MessageController.index);
//rota exclusão de mensagem
routes.delete('/message', MessageController.delete);

module.exports = routes;