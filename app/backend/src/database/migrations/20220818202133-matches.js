'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize').DataTypes} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      home_team: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
      },
      away_team: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  }
};
