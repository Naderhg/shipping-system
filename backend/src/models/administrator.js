const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Administrator extends Model {
    static associate(models) {
      Administrator.belongsTo(models.User, { foreignKey: 'id' });
    }
  }

  Administrator.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20)
    },
    access_level: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'standard'
    },
    department: {
      type: DataTypes.STRING(100)
    }
  }, {
    sequelize,
    modelName: 'Administrator',
    tableName: 'administrators',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Administrator;
}; 