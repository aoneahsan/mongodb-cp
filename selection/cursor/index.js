// **********************************************************************
//                        .hasNext(), .next()
// **********************************************************************
const usersCursor = db.users.find();
if (usersCursor.hasNext()) {
  usersCursor.next();
}

// **********************************************************************
//                        .sort(), .skip(), .limit()
// **********************************************************************
// add data
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
        title: 'jogging',
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
        title: 'walking',
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
      {
        title: 'running',
        frequency: 2,
      },
    ],
  },
  {
    name: 'demo2',
    phone: null,
    hobbies: [
      {
        title: 'fast running',
        frequency: 2,
      },
    ],
  },
]);
db.users.find().sort({ 'hobbies.title': -1, age: 1 }).pretty();
db.users.find().sort({ 'hobbies.title': 1, age: -1 }).skip(2).pretty();
db.users.find().sort({ 'hobbies.title': -1, age: -1 }).skip(2).limit(10).pretty();
db.users.find().sort({ 'hobbies.title': 1, age: 1 }).skip(2).limit(10).pretty();
