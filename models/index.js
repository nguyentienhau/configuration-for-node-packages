"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.ENVIRONMENT || "development";
const config = require(__dirname + "/../configurations/database.json")[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};


fs.readdirSync(__dirname).filter(function (fileName) {
	return fileName.indexOf(".") !== 0 && fileName !== path.basename(__filename) && fileName.slice(-3) === ".js" && fileName.indexOf(".test.js") === -1;
}).forEach(function (fileName) {
	const modelPath = path.join(__dirname, fileName);
	const model = require(modelPath)(sequelize, Sequelize.DataTypes);
	db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
