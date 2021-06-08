// **********************************************************************
//                        $deleteOne
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
db.users.deleteOne(
  { 'hobbies.title': { $regex: /running/ } }
  //   { writeConcern: { w: 1, j: true, wtimeout: 300 } } // you can set writeconcern but you don't have to default works fine
);

// **********************************************************************
//                        $deleteMany
// **********************************************************************
// now update all with hobbie running
db.users.deleteMany(
  { 'hobbies.title': { $regex: /running/ } }
  //   { writeConcern: { w: 1, j: true, wtimeout: 300 } } // you can set writeconcern but you don't have to default works fine
);
