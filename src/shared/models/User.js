'use strict';

import crypto from 'crypto';
import promisify from 'es6-promisify';

let hashWord = promisify(crypto.pbkdf2);

export default function(sequelize, DataTypes) {
  var User = sequelize.define('User', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(2048),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(512),
      allowNull: false
    }

  },
  {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.RefreshToken);
        User.hasMany(models.AccessToken);
      }
    },
    instanceMethods: {
      hashPassword: function() {
        var salt = crypto.randomBytes(128).toString('base64');

        return hashWord(this.password, salt, 10000, 512)
          .then((derivedKey) => {
            this.password = derivedKey.toString('hex');
            this.salt = salt;
            return this;
          });
      }
    }
  });

  return User;
};
