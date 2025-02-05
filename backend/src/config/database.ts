import { Sequelize } from "sequelize";


export const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");

        await sequelize.sync({ alter: true });
        console.log("Database synced!");


    } catch (error) {
        console.error("Failed to start the server:", error);
    }
};

const sequelize = new Sequelize('billing_app', 'postgres', '12345678', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize; 
