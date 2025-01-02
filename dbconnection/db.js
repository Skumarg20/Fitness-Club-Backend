import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('fitnessapp', 'postgres', 'Nilima@8081596918', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;