"use strict";

const level = require('level');
const sublevel = require('level-sublevel');

module.exports = function(dbName) {
  console.log('dbName: ' + dbName)
  return sublevel(
    level(dbName, {valueEncoding: 'json'})
  );
};
