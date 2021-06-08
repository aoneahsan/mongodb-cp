// **********************************************************************
//                        select the data you need | simple fields
// **********************************************************************
// only name and _id
db.movies.find({}, { name: 1 }).limit(4).pretty();

// only name
db.movies.find({}, { name: 1, _id: 0 }).limit(4).pretty();

// only name, rating, schedule.time, runtime
db.movies
  .find({}, { name: 1, rating: 1, 'schedule.time': 1, runtime: 1, _id: 0 })
  .limit(4)
  .pretty();

// **********************************************************************
//                        select the data you need | arrays
// **********************************************************************
// get data where rating greater than 9, but then only show genres where it's Horror
db.movies
  .find(
    { 'rating.average': { $gt: 9 } },
    { genres: { $elemMatch: { $eq: 'Horror' } } }
  )
  .pretty();

// get data where genres is Drama and 'Horror', and only show genres (the one we used for filter)
db.movies
  .find({ genres: { $all: ['Drama', 'Horror'] } }, { 'genres.$': 1 })
  .pretty(); // note here $ will mean the "Drama", or basically the value which we used for equality check

// **********************************************************************
//                        $slice
// **********************************************************************
// get data where genres is Drama and 'Horror', and only show first 2 genres
db.movies.find({ genres: { $all: ['Drama', 'Horror'] } }, { genres: { $slice: 2 }, name: 1 }).pretty(); // note here we need name: 1 otherwise we will get all other fields as well, this is just how mongodb works

// skip 1 item and then show 2 genres
db.movies.find({ genres: { $all: ['Drama', 'Horror'] } }, { genres: { $slice: [1, 2] }, name: 1 }).pretty(); // note here, the first number in $slice array will be the number of items you skip and second number is the number of items you will see (of course if there are only 2 items in array and you skip 1 and try to see 4 then you will only see 1 becuase that's the only one left and if you skip 2 then will see empty array)
