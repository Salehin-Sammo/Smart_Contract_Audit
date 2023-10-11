module.exports = (sequelize, DataTypes) => {
    const Vulnerability = sequelize.define('Vulnerability', {
        vulnerabilityId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        vulnerabilityName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },        
        impact: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT
        }
    });
    return Vulnerability;
};
