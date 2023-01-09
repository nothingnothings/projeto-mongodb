

let count = 1;

conn = new Mongo();
db = conn.getDB("myDatabase");





while (count < 1000000) {

    db.creditRatings.insertOne(
        {
            "person_id": count,
            "score": Math.random() * 10,
            "age": (Math.random() * 100).toFixed()
        }
    )
    printjson(`${count}`)
  count = count + 1;


}