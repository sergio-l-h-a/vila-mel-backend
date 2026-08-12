import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { publicDecrypt } from "node:crypto";

interface ProfessionalAttributes {
  id: number;
  name: string;
  profession: string;
  phone: string;
  image: string | null;
  gender: string | null;
  key: string | null;
  role: string | null;

  deleteCount: number;
  blocked: boolean;

  ip: string | null;
}

interface ProfessionalCreationAttributes
  extends Optional<ProfessionalAttributes, "id"> {}

export class Professional
  extends Model<ProfessionalAttributes, ProfessionalCreationAttributes>
  implements ProfessionalAttributes
{
  [x: string]: any;
  public id!: number;
  public name!: string;
  public profession!: string;
  public phone!: string;
  public image!: string | null;
  public gender!: string | null;
  public key!: string | null;
  public role!: string | null;

  public deleteCount!: number;
  public blocked!: boolean;

  public ip!: string | null;
}

Professional.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    deleteCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ip: {
      type  : DataTypes.STRING(50),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "professionals",
    timestamps: false,
  }
);
