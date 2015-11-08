import guid from 'node-uuid';
import config from '../config';

export default function(sequelize, DataTypes) {
  var RefreshToken = sequelize.define('RefreshToken', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: guid.v4
    },
    expires_in: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function() {
        return new Date((new Date()).getTime() + config.refresh_token_validity);
      }
    }

  },
  {
    classMethods: {
      associate: function(models) {
        RefreshToken.belongsTo(models.User);
      }
    }
  });

  return RefreshToken;
};