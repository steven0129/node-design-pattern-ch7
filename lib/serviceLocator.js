"use strict";

module.exports = () => {
  const dependencies = {};
  const factories = {};
  const serviceLocator = {};
  
  serviceLocator.factory = (name, factory) => {
     factories[name] = factory;
     console.log('factory() to factories: ' + JSON.stringify(Object.getOwnPropertyNames(factories)))
  };
  
  serviceLocator.register = (name, instance) => {
     dependencies[name] = instance;
     console.log('register() to dependencies: ' + JSON.stringify(Object.getOwnPropertyNames(dependencies)))
  };
  
  serviceLocator.get = (name) => {
    if (!dependencies[name]) {
      const factory = factories[name];
      dependencies[name] = factory && factory(serviceLocator);
      if (!dependencies[name]) {
        throw new Error('Cannot find module: ' + name);
      }
    }

    console.log('get() to factories: ' + JSON.stringify(Object.getOwnPropertyNames(factories)))
    console.log('get() to dependencies: ' + JSON.stringify(Object.getOwnPropertyNames(dependencies)))
    return dependencies[name];
  };

  console.log('In service locator...')
  console.log('dependencies: ' + JSON.stringify(Object.getOwnPropertyNames(dependencies)))
  console.log('factories: ' + JSON.stringify(Object.getOwnPropertyNames(factories)))
  console.log('serviceLocator' + JSON.stringify(Object.getOwnPropertyNames(serviceLocator)))

  return serviceLocator;
};
