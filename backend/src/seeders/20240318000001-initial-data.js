'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Seed roles
    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        permissions: JSON.stringify({
          users: ['read', 'write', 'delete'],
          shipments: ['read', 'write', 'delete'],
          settings: ['read', 'write']
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'merchant',
        permissions: JSON.stringify({
          shipments: ['read', 'write'],
          profile: ['read', 'write']
        }),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'courier',
        permissions: JSON.stringify({
          deliveries: ['read', 'write'],
          profile: ['read', 'write']
        }),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    // Get the role IDs
    const roles = await queryInterface.sequelize.query(
      'SELECT id, name FROM roles;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const adminRole = roles.find(role => role.name === 'admin');
    
    // Seed admin user
    const adminUser = await queryInterface.bulkInsert('users', [{
      id: Sequelize.literal('gen_random_uuid()'),
      email: 'admin@example.com',
      password_hash: await bcrypt.hash('admin123', 10),
      role_id: adminRole.id,
      status: 'active',
      created_at: new Date(),
      updated_at: new Date()
    }], { returning: true });

    // Seed admin profile
    await queryInterface.bulkInsert('administrators', [{
      id: adminUser[0].id,
      first_name: 'System',
      last_name: 'Administrator',
      phone: '+1234567890',
      access_level: 'super_admin',
      department: 'Administration',
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all seeded data in reverse order
    await queryInterface.bulkDelete('administrators', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  }
}; 