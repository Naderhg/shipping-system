const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Merchant extends Model {
    static associate(models) {
      Merchant.belongsTo(models.User, { foreignKey: 'id' });
      Merchant.hasOne(models.Wallet, { foreignKey: 'user_id' });
    }
  }

  Merchant.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    company_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    business_type: {
      type: DataTypes.STRING(100)
    },
    registration_number: {
      type: DataTypes.STRING(100)
    },
    contact_person: {
      type: DataTypes.STRING(255)
    },
    phone: {
      type: DataTypes.STRING(20)
    },
    address: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    verification_status: {
      type: DataTypes.STRING(50),
      defaultValue: 'pending'
    },
    commission_rate: {
      type: DataTypes.DECIMAL(5, 2)
    }
  }, {
    sequelize,
    modelName: 'Merchant',
    tableName: 'merchants',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Merchant;
}; 