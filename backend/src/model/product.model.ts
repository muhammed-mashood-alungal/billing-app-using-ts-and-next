import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Product extends Model {
  public id!: number;
  public code!: string;
  public name!: string;
  public category!: string;
  public size!: string;
  public color!: string;
  public price!: number;
  public stock!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export default Product;
