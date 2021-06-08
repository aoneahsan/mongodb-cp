// **********************************************************************
//                        $updateOne
// **********************************************************************
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
]);

// now update all with hobbie running
db.users.updateMany(
  { 'hobbies.title': { $regex: /running/ } },
  { $set: { hobbies: [{ title: 'listening', frequency: 4 }] } }
);

// **********************************************************************
//                        $inc
// **********************************************************************
// increment number field by any number (HINT: use this same operator to decrement just pass negative value)
// search user and increament age by 1
db.users.updateOne({ phone: '23408472342' }, { $inc: { age: 1 } });
// search user and decreament age by -2
db.users.updateOne({ phone: '23408472342' }, { $inc: { age: -2 } });

// **********************************************************************
//                        $min
// **********************************************************************
// min only update a field value if the new value is lower then the current value of column in db, (mean if age of user is 22 in db and you request to update age with operator $min, and you pass age value greater than 22 then if will not change age value as $min only update column value if new value if lower then the current one (if you pass 22 if will simply fail because that's default of mongo db (becuase that's the current value of age and mongo db will simply say there is nothing to update the current value and requested value are equal)))
// use $min to update age if new value if lower then current
db.users.updateOne({ phone: '23408472342' }, { $min: { age: 20 } }); // note it will only update if current age is at least 21 or greater

// **********************************************************************
//                        $max
// **********************************************************************
// max only update a field value if the new value is greater then the current value of column in db, (mean if age of user is 22 in db and you request to update age with operator $max, and you pass age value lower than 22 then if will not change age value as $max only update column value if new value if greater then the current one (if you pass 22 if will simply fail because that's default of mongo db (becuase that's the current value of age and mongo db will simply say there is nothing to update the current value and requested value are equal)))
// use $max to update age if new value if greater then current
db.users.updateOne({ phone: '23408472342' }, { $max: { age: 21 } }); // note it will only update if current age is at most 20 or lower

// **********************************************************************
//                        $mul
// **********************************************************************
// this is simply use to multiply the current value with the requested number
db.users.updateOne({ phone: '23408472342' }, { $mul: { age: 1.5 } }); // if current age is 10, the it will multiply 10 with 1.5 and result will be 15, so new age value will be 15

// **********************************************************************
//                        $unset
// **********************************************************************
// this is simply use to remove a field/column from document
db.users.updateMany({}, { $set: { removeThis: true } });
db.users.updateOne({}, { $unset: { removeThis: 1 } }); // NOTE: the value for field in this case "1" for "removeThis", does not matter you can pass anything you want, main point is to add field name here and it will work :)

// **********************************************************************
//                        $rename
// **********************************************************************
// this is simply use to rename a field/column in a document
db.users.updateMany({}, { $set: { renameThis: true } });
db.users.updateMany({}, { $rename: { renameThis: 'newName' } }); // NOTE: the value for field in this case "1" for "removeThis", does not matter you can pass anything you want, main point is to add field name here and it will work :)

// **********************************************************************
//                        upsert (it's not a operator, but setting options so that's why no $ sign with it, or any other setting option name)
// **********************************************************************
// make a update query a updateOrInsert, mean if filter document found it will update, but if no matching document found it will simply add a new document will data you passed for update query
db.users.updateOne(
  {
    name: 'not exists',
    details:
      'you can add any filter you want this will also be added in newly inserted document, as columns',
  },
  {
    $set: {
      moreDetails:
        'these $set fields will also get added in new document as data, main thing here is the last setting upsert and to set if to try',
      age: 12,
      phone: 213123123,
    },
  },
  { upsert: true }
); // NOTE: false if default

// **********************************************************************
//                        $ (to get first matching element of array)
// **********************************************************************
// search for a specific array element with $elemMatch (becuase if you use $and, it will simply get wrong data, for more info search for $and and $elemMatch operator in mongodb)
db.users.updateMany(
  { hobbies: { $elemMatch: { title: 'listening', frequency: 4 } } },
  { $set: { 'hobbies.$.goodListner': true } }
); // NOTE: $ in array (like here "hobbies.$.goodListner") will only give first element mathcing condition inside array, mean if there are more than 1 items mathcing condition in same array it will not update them all, to update all, follow the below sentence.

db.users.updateMany(
  { 'hobbies.frequency': { $gt: 4 } },
  { $set: { 'hobbies.$.highFrequency': true } }
);

// **********************************************************************
//                        $[] (to get all matching element of array)
// **********************************************************************
db.users.updateMany(
  { 'hobbies.frequency': { $gt: 4 } },
  { $set: { 'hobbies.$[].highFrequency': true } }
);

// **********************************************************************
//                        $[identifier] (to the matching element of array, based on condition defined by identifier)
// **********************************************************************
// search for specific elements of array and only update those elements of array which match the condition defined by the identifier
db.users.updateMany(
  {}, // NOTE: here you can pass any condition but sure the next identifier condition will only apply to elements which passed by this condition, but just to make sure this condition and identifier condition does not have to match
  { $set: { 'hobbies.$[el].goodFrequency': true } },
  { arrayFilters: [{ 'el.frequency': { $gt: 2 } }] } // think it as for each loop, you will get current element of array here and then you can define any condition you want :)
); // NOTE: $ in array (like here "hobbies.$.goodListner") will only give first element mathcing condition inside array, mean if there are more than 1 items mathcing condition in same array it will not update them all, to update all, follow the below sentence.

// **********************************************************************
//                        $push, $each, $sort
// **********************************************************************
// use $push to add new element in array column in document, $each to add more than one item in one query, and $sort to sort the column value with specific logic
db.users.updateMany(
  { name: 'ahsan' },
  { $push: { hobbies: { title: 'new hobby', frequency: 1 } } }
);

db.users.updateMany(
  { name: 'ahsan' },
  {
    $push: {
      hobbies: {
        $each: [
          { title: 'new hobby 1', frequency: 1 },
          { title: 'new hobby 2', frequency: 1 },
        ],
      },
    },
  }
);

db.users.updateMany(
  { name: 'ahsan' },
  {
    $push: {
      hobbies: {
        $each: [
          { title: 'new hobby 3', frequency: 1 },
          { title: 'new hobby 4', frequency: 1 },
        ],
        $sort: { frequency: -1 }, // 1 mean ascending, -1 mean descending
      },
    },
  }
);

// **********************************************************************
//                        $pull, $pop
// **********************************************************************
// use $pull to remove specific elements from array, and use $pop to remove first element or last element from array (if 1 is passed the last element, if -1 is passed then first element)
db.users.updateMany(
  { name: 'ahsan' },
  { $pull: { hobbies: { title: { $regex: /new hobby/ } } } }
);

db.users.updateMany(
  { name: 'ahsan' },
  { $pop: { hobbies: 1 } } // 1 will work as normal array pop function, -1 will be like unshift
);

// **********************************************************************
//                        $addToSet
// **********************************************************************
// use $addToSet to only add uniqe elements in array
db.users.updateMany(
  { name: 'ahsan' },
  { $addToSet: { hobbies: { title: 'new hobby', frequency: 1 } } }
);
