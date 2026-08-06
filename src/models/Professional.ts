import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface ProfessionalAttributes {
  id: number;
  name: string;
  profession: string;
  phone: string;
  image: string | null;
  gender: string | null;
  key: string | null;
  photoChanges: number;
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
  public image!: string | null;
  public gender!: string | null;
  public key!: string | null;
  public photoChanges!: number;
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

    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    gender: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

     // 🔑 Chave única do usuário
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    // 🔁 Quantas vezes ele já editou a foto
    photoChanges: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: "professionals",
    timestamps: false,
  }
);
