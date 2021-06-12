// ****************************************************************
// transactions
// ****************************************************************
// What are transactions?

'transactions are way to make a operation a atomistic operation, mean either the whole operation (all queries) will successed or if one part of operation (one query) faild nothing (no query) in that operation will take effect on DB';

// ****************************************************************
// create & use transaction
// ****************************************************************
// use a DB
'use blog';

// add a users collection and insert one user
const user = db.users.insertOne({ name: 'ahsan' });

// add posts collection and insert some posts
db.posts.insertOne({ title: 'a book1', userId: user.name });
db.posts.insertOne({ title: 'a book2', userId: user.name });
db.posts.insertOne({ title: 'a book3', userId: user.name });
db.posts.insertOne({ title: 'a book4', userId: user.name });
db.posts.insertOne({ title: 'a book5', userId: user.name });

// ****************************************************************
// main point
// ****************************************************************
// NOW: the main point is if you want to delete a user, all posts of that user should also get deleted (same of all other data of that user),
// you can simply run queries to do that and in 99% it will work, but in some cases you can get a error while deleting some data of that deleted user, now that will cause issue when you try to view that data again as user is deleted but data still points to that deleted user ID,

// that's why transactions are important,

// ****************************************************************
// running transactions
// ****************************************************************
// get a DB session
const session = db.getMongo().startSession();

// start transaction
session.startTransaction();

// get collections using session
const usersC = session.getDatabase('blog').users;
const postsC = session.getDatabase('blog').posts;

// now perform delete queries, on these sessions collections
usersC.deleteOne({ _id: user.name });
postsC.deleteMany({ _id: user.name });

// NOTE: these changes are not writen to DB yet, mean if yu tried to get user it will be there and you will get it

// now commit all transactions, to run all queries on DB
session.commitTransaction();
// now if all queries successed, all data will be deleted successfully, and if even one query faild nothing will be changed in DB

// ****************************************************************
// abprting a transaction
// ****************************************************************
// if for some reason you want to abort a transaction and clear the session use bellow command
session.abortTransaction();
