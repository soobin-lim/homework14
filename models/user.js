module.exports = (sequelize, type) => {

  return sequelize.define('user', {
    // checkPassword(loginPw) {
    //   return bcrypt.compareSync(loginPw, this.password);
    // },
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: type.STRING,
    password: type.STRING
  })
}