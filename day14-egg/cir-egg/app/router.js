'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/registry', controller.home.registry);
  router.post('/api/login', controller.home.login);
  router.get('/api/del', controller.home.del);
  router.get('/api/update', controller.home.update);
};
