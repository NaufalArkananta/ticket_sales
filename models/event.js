'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.seat,{
        foreignKey:'eventId', as:'eventSeat'
      })

      this.hasMany(models.ticket,{
        foreignKey:'eventId', as:'evenTicket'
      })
    }
  }
  Event.init({
    eventId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    eventName: DataTypes.STRING,
    eventDate: DataTypes.DATE,
    venue: DataTypes.STRING,
    price: DataTypes.INTEGER,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'event',
  });
  return Event;
};