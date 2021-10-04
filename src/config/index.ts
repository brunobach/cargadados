import { MongoClient } from 'mongodb';
import * as data from '../../config.json';

const config = {
    db: data.db,
    collection: data.collection,
    client : new MongoClient(data.urlMongo)
}
export const { db, collection, client } = config;