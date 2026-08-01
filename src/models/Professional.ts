import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface ProfessionalAttributes {
  id: number;
  name: string;
  profession: string;
  phone: string;
}

interface ProfessionalCreationAttributes
  extends Optional<ProfessionalAttributes, "id"> {}

export class Professional
  extends Model<ProfessionalAttributes, ProfessionalCreationAttributes>
  implements ProfessionalAttributes
{
  public id!: number;
  public name!: string;
  public profession!: string;
  public phone!: string;
}

Professional.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    profession: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "professionals",
    timestamps: false,
  }
);
