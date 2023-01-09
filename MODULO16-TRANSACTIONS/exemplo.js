




const session = db.getMongo().startSession();






session.getTransaction();



usersCollection.deleteOne({    ////collection vinculada a nossa session que criamos na database com 'db.getMongo().startSession()'...
  _id: ObjectId('621ef42a8ba295d281e9772c'),
});

postsCollection.deleteMany({
  userId: ObjectId('621ef42a8ba295d281e9772c')
});


session.commitTransaction(); ///aplica mudanças ao server (delete dessas 2 coisas, nesse caso)...




session.abortTransaction() ///deixa de aplicar mudanças ao server/database...