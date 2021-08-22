const {ObjectId,MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';

async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db("ASM");
    return dbo;
}


async function getRole(nameInput,pass){
    const dbo = await getDB();
    const s = await dbo.collection("users").findOne({ name: nameInput, pass:pass });
    if(s==null)
        return "-1";
    else
        return s.role;
}

async function insertUser(newUser) {
    const dbo = await getDB();
    await dbo.collection("users").insertOne(newUser);
}

async function insertProduct(newProduct) {
    const dbo = await getDB();
    await dbo.collection("products").insertOne(newProduct);
}

async function updateProduct(id, nameInput, quantityInput, priceInput) {
    const filter = { _id: ObjectId(id) };
    const newValue = { $set: { name: nameInput, quantity: quantityInput, price: priceInput } };

    const dbo = await getDB ();
    await dbo.collection("products").updateOne(filter, newValue);
}
async function getProductById(id) {
    const dbo = await getDB();
    const s = await dbo.collection("products").findOne({ _id: ObjectId(id) });
    return s;
}
async function deleteProduct(id) {
    const dbo = await getDB();
    await dbo.collection("products").deleteOne({ "_id": ObjectId(id) });
}
module.exports = {getDB,insertProduct,updateProduct,getProductById,deleteProduct,insertUser,getRole}
