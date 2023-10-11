const { DataTypes, Model } = require('sequelize');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        generateAuthToken() {
            const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            return token;
        }
    }

    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        contactNo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10, 15]
            }
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        }
    }, {
        sequelize,
        modelName: 'User'  // changed to 'User' to align with the naming conventions
    });
    User.associate = models => {
        User.hasMany(models.Report, {
            foreignKey: 'userId',
            as: 'Reports'
        });
    };

    User.validateUser = (data) => {
        const Schema = Joi.object({
            firstName: Joi.string().min(3).required().label('First Name'),
            lastName: Joi.string().min(3).required().label('Last Name'),
            email: Joi.string().email().required().label('Email'),
            password: passwordComplexity().required().label('Password'),
            contactNo: Joi.string().min(10).max(15).required().label('Contact No'),
            reason: Joi.string().min(3).required().label('Reason'),
        });

        return Schema.validate(data);
    };

    return User;
};

