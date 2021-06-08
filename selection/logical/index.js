// $or
db.movies.find({ $or: [{ 'rating.average': { $gt: 9 } }, { 'rating.average': { $lt: 5 } }], }).count();

// $and
db.movies.find({ $and: [{ 'rating.average': { $gt: 9 } }, { 'rating.average': { $ne: 5 } }], }).count()

// $nor
db.movies.find({ $nor: [{ 'rating.average': { $gt: 9 } }, { 'rating.average': { $lt: 5 } }], }).count()

// $not
db.movies.find({ 'rating.average': { $not: { $gt: 9 } } }).count()