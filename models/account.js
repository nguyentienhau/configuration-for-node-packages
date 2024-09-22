"use strict";

const { Model } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
	class Account extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			console.log(models);
		}
	}
	Account.init(
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			fullName: DataTypes.STRING,
			role: DataTypes.ENUM("user", "admin"),
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			sequelize,
			modelName: "Account",
			underscored: true
		}
	);
	return Account;
};
