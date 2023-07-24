import { Dog } from "../entities";
import { MongoClient } from "mongodb";

//Connexion à la base de données mongodb en se servant d'une variable d'environnement qui sera dans le .env
export const connection = new MongoClient(process.env.DATABASE_URL!);

const cleanup = () => {
  connection.close();
  process.exit();
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);


const collection = connection.db("dog-express").collection<Dog>("dog");

export const dogRepository = {
  findAll() {
    return collection.find().toArray();
  },
  async persist(dog: Dog) {
    const result = await collection.insertOne(dog);
    dog._id = result.insertedId; //On assigne l'id auto-généré à l'objet dog
    return dog;
  },
}