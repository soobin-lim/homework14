module.exports = (sequelize, type) => {
  return sequelize.define('blog', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: type.STRING
  },
  {
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  })
}