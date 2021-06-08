// **********************************************************************
//                        $size
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

// now only get users which has 5 hobbies
db.users.find({ hobbies: { $size: 5 } }).pretty();

// **********************************************************************
//                        $all
// **********************************************************************
// now only get users which has "asd" and "asdasd" as hobbies
db.users.find({ hobbies: { $all: ['asd', 'asdasd'] } }).pretty(); // note you can use $in but that will get documents which even have just one of these as hobbies, so that's why we used $all, and here order does not matter

// **********************************************************************
//                        $elemMatch
// **********************************************************************
// now only get users which has running as hobbies and frequency is less or equal to 10
db.users.find({ hobbies: { $elemMatch: {title: "running", frequency: { $lte: 10 } } } }).pretty();
