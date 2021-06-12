// ****************************************************************
// starting server with auth
// ****************************************************************
// just pass "--auth" flag while starting serve now users need to authenticate to use db

// NOTE: user authenticated and autherized for certain DB, will only be able to use and perform allowed actions in that certain DB, and in no other DB

// ****************************************************************
// db.auth()
// ****************************************************************
// use db.auth('username', 'password'), to log into current DB

// NOTE: if you created a user in DB "DB1", and you are currently in "DB2" (using "use DB2"), and you tried to login using user of "DB1", you will get error that, this is because user can only login to DB in which the user was created

// ****************************************************************
// creating user
// ****************************************************************
db.createUser({
  user: 'username',
  pwd: 'password',
  roles: ['currentDBRole', { role: 'roleName', db: 'db name' }],
});
// NOTE: this will add user in cuurent DB, mean if you are currently in "DB2", this user will gets added in "DB2", and you won't be able to login using this user, in "DB1", as explained above

// ****************************************************************
// user roles
// ****************************************************************
// main concept here is user roles, there are many predefined one, like
// root, userAdminAllDatabases, read, readWrite, etc (you can find all predefined roles in docs of course)

// NOTE: these roles will be responsible for what a user can and can't do, mean even if you created a user and didn't assign him any roles you won't be able to do anything even after login

// ****************************************************************
// user with different DB roles
// ****************************************************************
// NOTE: you can create a user who can have roles for different DBs, but still that user can only be created in one specific DB, so to log into that user you need to switch to that DB in which the user was created and after loging in you can simply switch to any other Db (of course whose access this user has) and then perform operations on that DB
