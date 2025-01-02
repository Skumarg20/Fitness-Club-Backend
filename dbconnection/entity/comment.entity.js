import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Blog from './blog.entity.js'; // Assuming you have a Blog entity defined

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    references:{
        model:Blog,
        key:'id'
    }
  },
  blogId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Blog,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Comment;