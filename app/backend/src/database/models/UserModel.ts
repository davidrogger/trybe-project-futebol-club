import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class UserModel extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

UserModel.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    tableName: 'users',
    timestamps: false,
  },
);

export default UserModel;
