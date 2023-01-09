


db.science.find(
    {
        _id: ObjectId("asijsaijasijasisa"),
        a: 03,
        b: 0.1
    }
).pretty()




db.science.aggregate(
    [
        {
            $project: {result: {$subtract: ["$a", "$b"]}}
        }
    ]
)



