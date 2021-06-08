// add some users
db.users.insertMany([
  {
    name: 'ahsan',
    phone: '23408472342',
    age: 21,
    hobbies: [
      {
        title: 'learning',
        frequency: 3,
      },
      {
        title: 'running',
        frequency: 8,
      },
      {
        title: 'cooking',
        frequency: 7,
      },
    ],
  },
  {
    name: 'asad',
    phone: 23408472342,
    age: 24,
    hobbies: [
      {
        title: 'learning',
        frequency: 7,
      },
      {
        title: 'running',
        frequency: 13,
      },
      {
        title: 'chess',
        frequency: 4,
      },
    ],
  },
  {
    name: 'demo1',
    phone: 'asdasd132',
    age: null,
    hobbies: [
      'asdasd',
      'asd',
      {
        title: 'running',
        frequency: 5,
      },
    ],
  },
  {
    name: 'demo2',
    phone: null,
    hobbies: [
      'cdswe',
      'asdasdasd',
      'asd',
      'asdasd',
      {
        title: 'running',
        frequency: 2,
      },
    ],
  },
  {
    name: 'demo2',
    phone: null,
    hobbies: ['asd'],
  },
]); // you should get some demo data from online source atleast 5-10k documents

// **********************************************************************
//                        explain()
// **********************************************************************
// create index, but before that, you can check you query stats with following command
db.users.explain().find(); // this will explain you the stats of this query

// **********************************************************************
//                        explain('queryPlanner')
// **********************************************************************
db.users.explain('queryPlanner').find(); // this will give a short stats of this query, with queryPlanner

// **********************************************************************
//                        explain('executionStats')
// **********************************************************************
db.users.explain('executionStats').find(); // this will explain you the stats of this query, with executionStats

// **********************************************************************
//                        explain('allPlansExecution')
// **********************************************************************
db.users.explain('allPlansExecution').find(); // this will explain detailed stats of this query, with allPlansExecution

// **********************************************************************
//                        getIndexes()
// **********************************************************************
// see all the available indexes of collection
db.users.getIndexes();

// **********************************************************************
//                        createIndex()
// **********************************************************************
// now let's create a index
// ascending order index
db.users.createIndex({ 'columnName.subColumnName': 1 }); // you get it, column name can be of any level, first level or tenth level, and here 1 mean ascending order index, yes, -1 will mean descending order index
// descending order index
db.users.createIndex({ 'columnName.subColumnName': -1 }); // you get it, column name can be of any level, first level or tenth level, and here 1 mean ascending order index, yes, -1 will mean descending order index

// drop a index
// **********************************************************************
//                        dropIndex()
// **********************************************************************
// here one important point, if you created a index using following command,
db.users.createIndex({ 'columnName.subColumnName': 1 });

// then to drop this index, you need to run following command
db.users.dropIndex({ 'columnName.subColumnName': 1 }); // mean you can not change 1 with -1 one and these two ar not equal

// **********************************************************************
//                        compound Index
// **********************************************************************
// a compound index is combination of more than one column index, and order matters when creating such compound index,
db.users.createIndex({ columnName1: 1, columnName2: -1, columnName3: 1 }); // so the index which will get created with this commmand will be something like this, "columnName1 columnName2 columnName3", this type of index will help with following types of queries
// 1) all these queries which have these three columns as filters
// 2) all these queries which have columnName1 as filter
// 3) all these queries which have columnName1 and columnName2 as filter
// 4) this index will not work for queries which don't have columnName1 as filter, or has columnName1 and columnName3 as filter but not columnName2 inbetween them
// 5) simply speaking index goes from left to right

// **********************************************************************
//                        unique Index
// **********************************************************************
// a unique index is used to make a column values unqiue in whole collection and it will give error on duplicate values
db.users.createIndex({ columnName1: 1 }, { unique: true }); // this will make sure you only have unique values for columnName1, this will give error if you already have duplicate values for columnName1, and also give error if you try to insert duplicate values for columnName1.

// **********************************************************************
//                        partialFilterExpression Index
// **********************************************************************
// a partialFilterExpression used to define some condition to create index on only those items which specify that condition
db.users.createIndex(
  { columnName1: 1 },
  { partialFilterExpression: { columnName1: { $gt: 30 } } }
); // this index will only be for those values in which columnName1 value is number and greater than 30, it's not required to have partialFilterExpression on same column you can add other column condition as well, like
db.users.createIndex(
  { columnName1: 1 },
  {
    partialFilterExpression: {
      columnName1: { $gt: 30 },
      columnName2: { $regex: /male/ },
    },
  }
);

// **********************************************************************
//                       combination of unqiue & partialFilterExpression Index
// **********************************************************************
// combination of unqiue & partialFilterExpression Index is need when let's say if you want to make a column unqiue but at the same time you also want to allow if user enter data without that column, please not, i mean with out that column not with column and setting value to null, or undefined, that will not work, so you can achive this using unique + partialFilterExpression index, example is following
db.users.createIndex(
  { columnName1: 1 },
  {
    unique: true,
    partialFilterExpression: { columnName1: { $exists: true } },
  }
);

// **********************************************************************
//                       expireAfterTime Index
// **********************************************************************
// expireAfterTime is used to delete items after a certain amount of time (defined while creating index), only works on simply index (does not work on compound index) and also only works on date columns
db.users.createIndex(
  { dateColumn: 1 },
  {
    expireAfterTime: 10, // accepts number of seconds it should expire after, here we entered 10s, mean it will delete items after 10s
  }
);
// usefull for like users sessions auto deleteing after 1hour or similar cases

// **********************************************************************
//                       covered query state
// **********************************************************************
// covered query state mean, let's say you have a index on column "name", and when you fetch data you only send back "name" column using projection (note only name, not even "_id"), so this will be send entirely from index and hence it will be faster than query where you will return "_id" as well,
db.users.createIndex({ name: 1 });

db.users.find({ name: 'ahsan' }, { name: 1, _id: 0 });
// the interesting thing here is if you check query stats using
db.users.explain('executionStats').find({ name: 'ahsan' }, { name: 1, _id: 0 });
// you will see that the "totalDocsExamined" will be 0 as all data return just from index, and mongodb will not even look at table for "_id" or any other data, hence query will be fast

// **********************************************************************
//                       multi-key index
// **********************************************************************
// if you add a index at array, or an embaded object in array then that will be a multi-key index, becuase items in array can differ, and mongo db will have to create separate index value for each array item, hence, a simply index + multi-key index is allowed, but a multi-key index + multikey index is not allowed as that will cause too much performance
db.users.createIndex({ arrayColumn: 1 });
db.users.createIndex({ 'arrayColumn.itemName': 1 });

// **********************************************************************
//                       text index
// **********************************************************************
// this is best if you want to search for a text in db, like product title or description (but it cause performance so better to only have one text index per collection)
db.users.createIndex({ textColumn: 'text' }); // when creating a "text", index you need to pass text as index value, instead of 1/-1 other wise a simple ascending or descending index will get created instead of text index.

// now how you will search using such text index, it's simple
db.users.find({ $text: { $search: 'red text' } }); // NOTE: it will be treated as two words "red" and "text", if you want to search for one word, "red text", then you have to do it like this
db.users.find({ $text: { $search: '"red text"' } }); // main thing here is that you need to wrap text in "".

// **********************************************************************
//                       text index, meta info and score result
// **********************************************************************
// when working these text index mongodb does something special, it assigns a score rate to each item and you can sort items using that to get a better matching item on top
db.users
  .find({ $text: { $search: 'red text' } }, { score: { $meta: 'textScore' } })
  .sort({ score: { $meta: 'textScore' } });

// text index, and when search search for some letters and remove some letters from search
db.users.find({ $text: { $search: 'include -exculde' } }); // in this example we will only get back items which has 'include' in the columns which were added in text index while defining text index and which does not has 'exculde' in these columns which are part of text index, and all this is because of adding '-' in front of letter which you want to exculde

// **********************************************************************
//                       text index, default_language, weights
// **********************************************************************
// default_language use to remove the default words which will not be count when searching like "a", "is" for english (other can be found in docs), and weights to give proper weight to column which has more important text according to your application.
db.users.createIndex(
  { textColumn: 'text', textColumn2: 'text' },
  { weights: { textColumn: 1, textColumn2: 3 }, default_language: 'english' }
); // here textColumn2 will have 3 times the weight when searching for text then textColumn, which will be used to calculate the textscore, and default_language is to just set the language for text index, english is default so it will not change anything

// when searching for text you can also define case sentivity and language there directly
db.users.find({
  $text: { $search: 'red text', $caseSentivity: true, $language: 'english' },
}); // here we set the case sentivity to true (default if false) (now "a" is not equal to "A"), and set language to english (default is english)

// **********************************************************************
//                       index creation in background
// **********************************************************************
db.users.createIndex({ columnName1: 1 }, { background: true }); // this will create index in backgroun mean DB will be available for other queries
