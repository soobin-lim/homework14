module.exports = (sequelize, type) => {
  return sequelize.define('tag', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tag: type.STRING
      // userId: type.INTEGER is generated automatically
  })
}