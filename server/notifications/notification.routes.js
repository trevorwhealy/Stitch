const NotificationRouter = require('express').Router();
const NotificationCtrl = require('./notification.controller');

NotificationRouter.get('/', NotificationCtrl.getAll);
NotificationRouter.post('/all/markasread', NotificationCtrl.markAllAsRead);
NotificationRouter.post('/:id/markasread', NotificationCtrl.markAsRead);

module.exports = NotificationRouter;
