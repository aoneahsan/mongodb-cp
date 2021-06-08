// **********************************************************************
//                        $regex
// **********************************************************************
// add some users
db.users.insertMany([
  {
    name: 'ahsan',
    phone: '23408472342',
    summary: 'ahsan is a developer',
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
    summary: 'asad is a senior developer',
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
    summary: 'demo1 is a random user',
    hobbies: {
      title: 'learning',
      frequency: 7,
    },
  },
  {
    name: 'demo2',
    summary: 123123123123123,
    phone: null,
    hobbies: {
      items: ['learning', 'frequency'],
    },
  },
]);

// now only get users which has age column, also where age=null
db.users.find({ summary: { $regex: /senior/ } }).pretty();

// **********************************************************************
//                        $expr   (expression (some complex expression logic))
// **********************************************************************
// add some data
db.sales.insertMany([
  {
    volumn: 100,
    target: 120,
  },
  {
    volumn: 89,
    target: 80,
  },
  {
    volumn: 200,
    target: 177,
  },
]);

// now only get those documents where volumn is greater than target, (two documents (volumn: 89, 200))
db.sales.find({ $expr: { $gt: ['$volumn', '$target'] } }).pretty();

// now let's do a complex query, if volumn if greater than 190, subtract 30 from it and then see if the result volumn is greater than target, if volumn is not greater than 190, simply use original volumn value, (will get only volumn: 89 document)
db.sales
  .find({
    $expr: {
      $gt: [
        {
          $cond: {
            if: { $gte: ['$volumn', 190] },
            then: { $subtract: ['$volumn', 30] },
            else: '$volumn',
          },
        },
        '$target',
      ],
    },
  })
  .pretty();
