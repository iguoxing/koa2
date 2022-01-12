/*
 * @Author: ArdenZhao
 * @Date: 2022-01-12 18:10:31
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-01-12 18:28:07
 * @FilePath: /koa2/mysql.js
 */
const Mysql = require("mysql");

const pool = Mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "so",
    dateStrings: true
});

module.exports = (sql, values) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
            console.log('connected as id ' + connection);
			if (err) {
				reject(err);
			} else {
				// sql = "select * from user;"
				connection.query(sql, values, (error, rows) => {
					if (error) {
						reject(error);
					} else {
						resolve(rows);
					}
					connection.release();
				})
			}
		})
	})
}