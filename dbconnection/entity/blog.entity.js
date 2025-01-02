import { DataTypes } from "sequelize";
import sequelize from "../db.js";


const Blog=sequelize.define('Blog',{
    id:{
        type:DataTypes.UUIDV4,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,   
    },
    Imageurl:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,    
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
    },
    tags:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:true,
    },
    likes:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    },
    comment:{
        type:DataTypes.INTEGER,
        defaultValue:0,
    }
})

export default Blog;