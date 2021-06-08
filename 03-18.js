// users data
[
  {
    // "_id": "user1",
    name: 'ahsan',
    email: 'ahsan@demo.com',
    age: 21,
  },
  {
    // "_id": "user2",
    name: 'asad',
    email: 'asad@demo.com',
    age: 24,
  },
][
  // posts data
  ({
    title: 'first post',
    description: 'first post description',
    tags: ['first', 'post', 'ahsan'],
    // "creator": "user1",
    creator: ObjectId('60b7beb61499a5aaea7ae418'),
    comments: [
      {
        author: ObjectId('60b7beb61499a5aaea7ae419'),
        text: 'first post comment 1',
      },
      {
        author: ObjectId('60b7beb61499a5aaea7ae418'),
        text: 'first post comment 2',
      },
    ],
  },
  {
    title: 'second post',
    description: 'second post description',
    tags: ['second', 'post', 'ahsan'],
    // "creator": "user2",
    creator: ObjectId('60b7beb61499a5aaea7ae419'),
    comments: [
      {
        author: ObjectId('60b7beb61499a5aaea7ae419'),
        text: 'second post comment 1',
      },
      {
        author: ObjectId('60b7beb61499a5aaea7ae418'),
        text: 'second post comment 2',
      },
    ],
  })
];

// adding schema validation
db.createSchema('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'description', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        description: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be a objectId and is required',
        },
        comments: {
          bsonType: 'array',
          description: 'must be a array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              author: {
                bsonType: 'objectId',
                description: 'must be a objectId and is required',
              },
            },
          },
        },
      },
    },
  },
});

// updating collection validation schema
db.runCommand({
  collMod: 'posts',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'description', 'creator', 'comments'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        description: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be a objectId and is required',
        },
        comments: {
          bsonType: 'array',
          description: 'must be a array and is required',
          items: {
            bsonType: 'object',
            required: ['text', 'author'],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required',
              },
              author: {
                bsonType: 'objectId',
                description: 'must be a objectId and is required',
              },
            },
          },
        },
      },
    },
  },
//   validationAction: "error",
  validationAction: "warn",
});