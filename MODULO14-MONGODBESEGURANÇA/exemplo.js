db.createUser({
  user: 'Arthur',
  pwd: 'Juc@pirama1',
  roles: ['userAdminAnyDatabase'],
});

// mongo -u Arthur -p Juc@pirama1 --authenticationDatabase admin     ///command line.

///use shop
db.createUser({
  user: 'appdev',
  pwd: 'devapp',
  roles: [],
});




db.updateUser('appdev',
  {
    roles: [
      'readWrite',
      {
        role: 'readWrite',
        db: 'blog',
      },
    ],
  }
)
