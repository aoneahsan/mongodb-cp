// ************************************************************************
// ********************  *****   Insertion       ***** ********************
// ************************************************************************

// use contactData   -  use this to get the collection

// simple insert
db.contacts.insertMany([
  { name: 'John', age: 20 },
  { name: 'Johnus', age: 29 },
  { name: 'Johny', age: 24 },
]);

// insert with custom _id
db.contacts.insertMany([
  { _id: 1, name: 'John', age: 20 },
  { _id: 2, name: 'Johnus', age: 29 },
  { _id: 3, name: 'Johny', age: 24 },
]);
db.contacts.insertMany([
  { _id: 1, name: 'John', age: 20 },
  { _id: 2, name: 'Johnus', age: 29 },
  { _id: 4, name: 'Johny', age: 24 },
]); // 4 will not get added in this case due to mongodb ordered way of adding items

// the above will fail if you run that command 2 times, this is becuase mongodb add data ordered wise, mean 1 -> 2 -> 3, and if error occure at 2, 1 will be added at that time, and 3 will not get added

// now, let's change this ordered way of adding data
db.contacts.insertMany(
  [
    { _id: 1, name: 'John', age: 20 },
    { _id: 2, name: 'Johnus', age: 29 },
    { _id: 3, name: 'Johny', age: 24 },
  ],
  { ordered: false }
); // true is default
db.contacts.insertMany(
  [
    { _id: 1, name: 'John', age: 20 },
    { _id: 2, name: 'Johnus', age: 29 },
    { _id: 4, name: 'Johny', age: 24 },
  ],
  { ordered: false }
); // 4 will get added in this case due to that we changed the mongodb ordered way of adding items to false

// writeConcern
// writeConcern is basically your data backup while mongodb command is been executing
db.contacts.insertOne({ name: 'John', age: 20 }, { writeConcern: { w: 1 } }); // w: 1 is default and this means server will get aknowladge and you will get newly created document id back, if set to zero query will run fast but you may lose some data as server is not watching whether that query get executed or not (and you will also not get newly created document id in response (because may be that document could not get created and server is not waiting for that to finish))

db.contacts.insertOne({ name: 'asdsa' }, { writeConcern: { w: 1, j: false } }); // j = jurnel (it's like a todo list before data get write on actual file, mongodb right it to jurnel (if j set to "true", by default is false/undefined, mean by default mongodb does not wirite it to jurnel, but if you turn this on, by setting j: true, then your query will take a bit long as it need to write it in jurnel it will be fast than writing in disk, but still slower than j: false, but this way you will get extra check of security on your data)

db.contacts.insertOne(
  { name: 'asdasd' },
  { writeConcern: { w: 1, j: true, wtimeout: 300 } }
); // wtimeout is basically as name suggest it's time before your query get fails liek timeout for your query.
