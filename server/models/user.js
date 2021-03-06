module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      tableName: "Users",
      timestamps: false
    }
  );
  user.associate = function(models) {
    user.hasMany(models.Journal, { foreignKey: "id_user", as: "journal" });
  };

  return user;
};
