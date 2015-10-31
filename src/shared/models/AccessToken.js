'use strict';

export default function(sequelize, DataTypes) {
  var AccessToken = sequelize.define('AccessToken', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.UUID,
      allowNull: false
    },
    expires_in: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  },
  {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return AccessToken;
};
