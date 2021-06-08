// **********************************************************************
//                        $exists
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
    hobbies: {
      title: 'learning',
      frequency: 7,
    },
  },
  {
    name: 'demo2',
    phone: null,
    hobbies: {
      items: ['learning', 'frequency'],
    },
  },
]);

// now only get users which has age column, also where age=null
db.users.find({
    age: { $exists: true }
}).pretty()

// where age has some valid value, not null, not undefined
db.users.find({
    age: { $exists: true, $ne: null, $ne: undefined }
}).pretty()


// **********************************************************************
//                        $type
// **********************************************************************
// single type check
db.users.find({
    phone: { $type: "number" }
}).pretty()

// multiple type check
db.users.find({
    phone: { $type: ["number", "string"] }
}).pretty()