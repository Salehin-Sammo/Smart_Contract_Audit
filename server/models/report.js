module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('Report', {
        reportId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        contractName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        auditDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId: { // As per your requirement
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Report.associate = models => {
        Report.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
        });
    };
    return Report;
};
