db.customers.updateOne(
  {},
  {
    $set: {
      orders: [
        {
          productId: ObjectId('61ffddfb919138fa9fce93d8'),

          quantity: 2,
        },
      ],
    },
  }
);

db.createCollection('posts', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'text', 'creator', 'comments'],

      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string, and is required',
        },
        text: {
          bsonType: 'string',
          description: 'must be a string, and is required',
        },

        creator: {
          bsonType: 'objectId', ///essa é a escrita aceita pelo mongodb para esse tpye....
          description: 'must be an objectId , and is required',
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array of objects/documents, and is required',
          items: {
            bsonType: 'object',
            required: ["text", "author"],
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required.',
              },
              author: {
                bsonType: 'objectId', 
                description: 'must be an objectId and is required'
            }
            },
          },
        },
      },
    },
  },
});
