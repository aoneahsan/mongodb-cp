// ****************************************************************
// types of numbers in mongodb
// ****************************************************************
// 1) NumberInt("1") // this is Int(32)  small int
db.nums.insertOne({ value: NumberInt(1) }); // not recomemded (becuase if you exceed the range of safe integer you will get a error in NumberInt it's not so common but in NumberLong it is, so the recomemded way is )
db.nums.insertOne({ value: NumberInt('1') });
// or  (main point is just to pass value as string so you don't get "safe integer", but this way you won't and mongodb with handle this properly) (note: "safe interger" limit is js related, not mongodb, but due to that error your value never raches db, that's why use string when using these special constructors and you are good to go :)
db.nums.insertOne({ value: NumberInt('1') });

// 2) NumberLong("1") // this is Int(64)  long int
db.nums.insertOne({ value: NumberLong('1') });

// 3) 1 // this is Double(64)  double/float  (by default in JS this type is used when you don't specify one)
db.nums.insertOne({ value: 1 });

// 4) NumberDecimal("1") // this is Double(128)  high prician double (when you can't affod to mis a 10th decimal point go with this :)
db.nums.insertOne({ value: NumberDecimal('1') });

// ****************************************************************
// updating values after words
// ****************************************************************
// NOTE: when you created a value using NumberDecimal(), you should update that value using NumberDecimal(), otherwise the type of number will become Double/float instead of NumberDecimal()/high prician double, same goes for all three constructors
