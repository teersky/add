var UserSQL = {  
        insert:'INSERT INTO users(username,password) VALUES(?,?)', 
        queryAll:'SELECT * FROM users',  
        getUserByName:'SELECT * FROM users WHERE username = ? ',
        deletes:'DELETE FROM users WHERE id = ?'
      };
 module.exports = UserSQL;