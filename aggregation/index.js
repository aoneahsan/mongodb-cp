// add some users (add some demo data with at least 5-10k items)

// **********************************************************************
//                        $match
// **********************************************************************
// select items where gender is "female"
db.persons.aggregate([{ $match: { gender: 'female' } }]);

// **********************************************************************
//                        $match, $group
// **********************************************************************
// select items where gender is "female", and group by state they live in
db.persons
  .aggregate([
    { $match: { gender: 'female' } },
    {
      $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 2 } },
    }, // after $sum the number is the value which will be added in total for one item count, here we are adding 2 per item count
  ])
  .pretty();

// **********************************************************************
//                        $match, $group, $sort
// **********************************************************************
// select items where gender is "female", and group by state they live in and sort by totalPersons in decs
db.persons
  .aggregate([
    { $match: { gender: 'female' } },
    {
      $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 2 } },
    }, // after $sum the number is the value which will be added in total for one item count, here we are adding 2 per item count
    {
      $sort: { totalPersons: -1 },
    },
  ])
  .pretty();

// **********************************************************************
//                        $project, $concat, $toUpper, $substrCP, $subtract, $strLenCP
// **********************************************************************
// use $project to change who data retrive from db, get gender and full name by combining name.first and name.last (also make it capitalize)
db.persons
  .aggregate([
    {
      $project: {
        gender: 1,
        fullname: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] },
              ],
            },
          ],
        },
      },
    },
  ])
  .pretty();

// **********************************************************************
//                        $project, $concat, $toUpper, $substrCP, $subtract, $strLenCP, $convert $toDouble
// **********************************************************************
// in above result, add email and location as well, and location should be a "Point" location
db.persons
  .aggregate([
    {
      $project: {
        gender: 1,
        location: 1,
        email: 1,
        fullname: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] },
              ],
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        fullname: 1,
        email: 1,
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $toDouble: '$location.coordinates.latitude',
            },
          ],
        },
      },
    },
  ])
  .pretty();

// **********************************************************************
//                        $project, $concat, $toUpper, $substrCP, $subtract, $strLenCP, $convert $toDouble, $toDate
// **********************************************************************
// in above result, add birthdate and age, and birthdate should be a Date object
db.persons
  .aggregate([
    {
      $project: {
        gender: 1,
        location: 1,
        email: 1,
        dob: 1,
        fullname: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] },
              ],
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        fullname: 1,
        email: 1,
        dob: 1,
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $toDouble: '$location.coordinates.latitude',
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        fullname: 1,
        email: 1,
        birthdate: { $toDate: '$dob.date' },
        age: '$dob.age',
        location: 1,
      },
    },
  ])
  .pretty();

// **********************************************************************
//                        $project, $concat, $toUpper, $substrCP, $subtract, $strLenCP, $convert $toDouble, $toDate, $group, $isoWeekYear, $sum, $sort
// **********************************************************************
// in above result, add birthdate and age, and birthdate should be a Date object
db.persons
  .aggregate([
    {
      $project: {
        gender: 1,
        location: 1,
        email: 1,
        dob: 1,
        fullname: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] },
              ],
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        fullname: 1,
        email: 1,
        dob: 1,
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $toDouble: '$location.coordinates.latitude',
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        fullname: 1,
        email: 1,
        birthdate: { $toDate: '$dob.date' },
        age: '$dob.age',
        location: 1,
      },
    },
    {
      $group: {
        _id: { birthYear: { $isoWeekYear: '$birthdate' } },
        numberOfPersons: { $sum: 1 },
      },
    },
    {
      $sort: { numberOfPersons: -1 },
    },
  ])
  .pretty();

// **********************************************************************
//                        $group, $push
// **********************************************************************
// start working with arrays
// first add some data
db.friends.insertMany([
  {
    name: 'Max',
    hobbies: ['Sports', 'Cooking'],
    age: 29,
    examScores: [
      { difficulty: 4, score: 57.9 },
      { difficulty: 6, score: 62.1 },
      { difficulty: 3, score: 88.5 },
    ],
  },
  {
    name: 'Manu',
    hobbies: ['Eating', 'Data Analytics'],
    age: 30,
    examScores: [
      { difficulty: 7, score: 52.1 },
      { difficulty: 2, score: 74.3 },
      { difficulty: 5, score: 53.1 },
    ],
  },
  {
    name: 'Maria',
    hobbies: ['Cooking', 'Skiing'],
    age: 29,
    examScores: [
      { difficulty: 3, score: 75.1 },
      { difficulty: 8, score: 44.2 },
      { difficulty: 6, score: 61.5 },
    ],
  },
]);
// now let's group by age, and push all hobbies in a new column "allHobbies"
db.friends
  .aggregate([
    { $group: { _id: { age: '$age' }, allHobbies: { $push: '$hobbies' } } },
  ])
  .pretty();

// **********************************************************************
//                        $unwind, $group, $push
// **********************************************************************
// with above result you can see we have arrays in arrays, but what if we need allHobbies to just hold hobbies string and not arrays, well we can achive that using unwind

// first see what unwind do, it takes all items out from a array and creates multiple documents with other items same but with each array item one by one
db.friends.aggregate([{ $unwind: '$hobbies' }]).pretty();

// now that you have a idea of unwind, let's group the above result
db.friends
  .aggregate([
    { $unwind: '$hobbies' },
    { $group: { _id: { age: '$age' }, allHobbies: { $push: '$hobbies' } } },
  ])
  .pretty();

// by this we can encounter duplicate values, to solve that use, $addToSet, instead of $push, what this does it avoids duplicate values
db.friends
  .aggregate([
    { $unwind: '$hobbies' },
    { $group: { _id: { age: '$age' }, allHobbies: { $addToSet: '$hobbies' } } },
  ])
  .pretty();

// **********************************************************************
//                        $project, $slice
// **********************************************************************
// only get first item in examScores array
db.friends
  .aggregate([{ $project: { examScore: { $slice: ['$examScores', 0] } } }])
  .pretty();
// note if you only pass two items in $slice, then first w=one if column name, and second one is number of items you want to take from array, mean in above example we are taking 0 items from array mean we will get empty array

db.friends
  .aggregate([{ $project: { examScore: { $slice: ['$examScores', 1] } } }])
  .pretty();
// in above example we are getting 1 item so we will get item at 0 index,

// some times we want to skip some indexex or want to take only last 1 or 2-.. items in that case
// if want to take last 2 items
db.friends
  .aggregate([{ $project: { examScore: { $slice: ['$examScores', -2] } } }])
  .pretty();
// above example we used -2 which will only give un items at last two indexex

// if want to skip some indexex, then we need to pass three items in $slice, 1: column name, 2: indexes to skip, 3: items to take
db.friends
  .aggregate([{ $project: { examScore: { $slice: ['$examScores', 2, 3] } } }])
  .pretty();
// in above example we skip like first 2 indexes, and then we requested 3 items

// **********************************************************************
//                        $project, $size
// **********************************************************************
// get length of a array
db.friends
  .aggregate([{ $project: { numberOfScores: { $size: '$examScores' } } }])
  .pretty();

// **********************************************************************
//                        $project, $filter
// **********************************************************************
// filter array items to only get items which matches some condition
db.friends
  .aggregate([
    {
      $project: {
        scores: {
          $filter: {
            input: '$examScores',
            as: 'score', // note: here "as" is shortcut of "alias", mean this filter will run like a foreach loop of each item of this "input" array column, and this "as", is basically the loop variable name which will hold loop item data
            cond: { $gt: ['$$score.score', 60] }, // we are usingg "$$" becuase "$" means document column name, so that's why for some cases where we have this loop variable thing we use "$$" to refer to that loop variable
          },
        },
      },
    },
  ])
  .pretty();

// **********************************************************************
//                        $project, $filter
// **********************************************************************
// only get highestExamScore for each document in collection
db.friends
  .aggregate([
    { $unwind: '$examScores' },
    { $sort: { 'examScores.score': -1 } },
    // { $group: { _id: "$_id", highestExamScore: { $first: "$examScores.score" } } }
    {
      $group: {
        _id: '$_id',
        name: { $first: '$name' },
        highestExamScore: { $max: '$examScores.score' },
      },
    },
  ])
  .pretty();

// **********************************************************************
//                        $bucket
// **********************************************************************
// $bucket is used to get logistic data of your collection
db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: '$dob.age',
        boundaries: [18, 30, 48, 66, 82, 99, 120],
        output: {
          //   names: { $push: '$name' },
          averageAge: { $avg: '$dob.age' },
          numOfPersons: { $sum: 1 },
        },
      },
    },
  ])
  .pretty();

// **********************************************************************
//                        $bucketAuto
// **********************************************************************
// $bucket is used to get logistic data of your collection
db.persons
  .aggregate([
    {
      $bucketAuto: {
        groupBy: '$dob.age',
        buckets: 5,
        output: {
          //   names: { $push: '$name' },
          averageAge: { $avg: '$dob.age' },
          numOfPersons: { $sum: 1 },
        },
      },
    },
  ])
  .pretty();

// **********************************************************************
//                        $match, $project, $sort, $skip, $limit
// **********************************************************************
// get first 10 oldest men in persons collection
db.persons
  .aggregate([
    { $match: { gender: 'male' } },
    {
      $project: {
        _id: 0,
        name: { $concat: ['$name.first', ' ', '$name.last'] },
        birthDate: { $toDate: '$dob.date' },
        age: '$dob.age',
      },
    },
    { $sort: { birthDate: 1 } },
    {
      $project: {
        name: 1,
        age: 1,
      },
    },
    { $skip: 10 },
    { $limit: 10 },
  ])
  .pretty();
// kindly note, order of $match, $project, $sort, and every other function in pipeline matters mean if you sort first and then match you will get total different result so keep in mind that you need to have proper order in pipeline.

// **********************************************************************
//                        $out
// **********************************************************************
// if you want to store the result of a aggregation in to another collection you can do that using $out
// note: i copied the below pipeline from above, just to store it's result in a new collections
db.persons
  .aggregate([
    {
      $project: {
        gender: 1,
        location: 1,
        email: 1,
        fullname: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] },
              ],
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] },
              ],
            },
          ],
        },
      },
    },
    {
      $project: {
        gender: 1,
        fullname: 1,
        email: 1,
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0,
              },
            },
            {
              $toDouble: '$location.coordinates.latitude',
            },
          ],
        },
      },
    },
    { $out: 'transformedPersons' },
  ])
  .pretty();

// **********************************************************************
//                        $geoNear
// **********************************************************************
// we need above example to continue, because we will use the result collection of above example

// now first create a geoIndex: "2dsphere" index on "location" column in "transformedPersons" collection.
db.transformedPersons.createIndex({ location: '2dsphere' });

// next, pick up a location "coordinates" from this transformedPersons collection just so we can find the persons near it, let's use the below one
const coordinates = [-31.08, -29.81];

// now let's start the query to find persons near this above location
db.transformedPersons
  .aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [-31.08, -29.81],
        },
        distanceField: 'distanceFromLocation', // this name is up to you, choose any name you want
        maxDistance: 100000, // distance in metters, this is like 100KM
        query: {
          gender: 'male',
          //   age: { $gt: 30 },
        }, // any query which you directly want to perform on collection and not on result of this $geoNear method
        //   num: 10, // this is used as limit but directly on collection, mean better query // no longer works, need to use $limit in next stage :)
      },
    },
    { $limit: 10 },
  ])
  .pretty();
