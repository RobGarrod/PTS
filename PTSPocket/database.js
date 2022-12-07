const fs = require('fs');
const path = './db.sqlite';

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db.sqlite');

let databaseExists = false;

if(fs.existsSync(path)){
    databaseExists = true;
}else{
    fs.appendFile(path, (error) => {
        if(error){
            console.log(error);
        }else{
            console.log('No database detected, file being created')
        }
    });
};

//Init DB 
db.serialize(()=>{

    //DEV ONLY REMOVE ON PROD
    if(1===1){
        db.run("DROP TABLE IF EXISTS tblUsers")
        db.run("DROP TABLE IF EXISTS tblRolePermissions")
        db.run("DROP TABLE IF EXISTS tblRoles")
        db.run("DROP TABLE IF EXISTS tblPermissions")
    }

    /*
        Create the role, permission and user tables in FK dependancy order
    */
    db.run('CREATE TABLE IF NOT EXISTS tblRoles (RoleID INTEGER UNIQUE PRIMARY KEY, RoleName TEXT, RoleDescription TEXT)',(error)=>{
        if(error)    {
            console.log(error)
        }else{
            console.log("tblRoles Created...")
        }
    });

    db.run('CREATE TABLE IF NOT EXISTS tblUsers (UserID INTEGER UNIQUE PRIMARY KEY, UserName TEXT, EmailAddress TEXT, CreationDate TEXT, RoleID INTEGER, FOREIGN KEY (RoleID) REFERENCES tblRoles (RoleID))',(error)=>{
        if(error)    {
            console.log(error)
        }else{
            console.log("tblUsers Created...")
        }
    });

    db.run('CREATE TABLE IF NOT EXISTS tblPermissions (PermissionID INTEGER UNIQUE PRIMARY KEY, PermissionName TEXT, PermissionDescription TEXT)',(error)=>{
        if(error)    {
            console.log(error)
        }else{
            console.log("tblPermissions Created...")
        }
    });

    db.run('CREATE TABLE IF NOT EXISTS tblRolePermissions (RoleID INTEGER, PermissionID INTEGER, PRIMARY KEY (RoleID, PermissionID) )',(error)=>{
        if(error)    {
            console.log(error)
        }else{
            console.log("tblRolePermissions Created...")
        }
    });

    /*
    Insert basic user/role/permission data
    */
   db.run('INSERT INTO tblRoles (RoleName, RoleDescription) VALUES ' +
   '("Admin", "System god")'
   ,(error)=>{
       if(error)    {
           console.log(error)
        }else{
            console.log("Default roles added to tblRoles...")
        }
    });

    db.run('INSERT INTO tblPermissions (PermissionName, PermissionDescription) VALUES ' +
    '("Create Achievements", "Grants permission to create achievements in the system"),' +
    '("Delete Achievements", "Grants permission to delete achievements in the system")' 
    ,(error)=>{
        if(error)    {
            console.log(error)
         }else{
             console.log("Default permissions added to tblPermissions...")
         }
     });

     db.run('INSERT INTO tblRolePermissions (RoleID, PermissionID) VALUES ' +
     '("1", "1"),' +
     '("1", "2")' 
     ,(error)=>{
         if(error)    {
             console.log(error)
          }else{
              console.log("Default permissions linked to roles...")
          }
      });
});