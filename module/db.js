var config = require('./config.js');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

class Db {
  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  constructor() {
    this.dbClient = '';
    this.connect();
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (!this.dbClient) {
        MongoClient.connect(config.dbUrl, (err, client) => {
          if (err) {
            console.log('数据库链接失败');
            reject(err);
            return;
          }
          console.log('数据库链接成功');
          this.dbClient = client.db(config.dbName);
          resolve(this.dbClient);
        });
      } else {
        resolve(this.dbClient);
      }
    });
  }

  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(function (db) {
        var result = db.collection(collectionName).find(json);
        result.toArray(function (err, docs) {
          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        });
      })
    });
  }

  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).updateOne(json1, {
          $set: json2
        }, (err, result) => {
          if(err) {
            reject(err);
          }else {
            resolve(result);
          }
        });
      });
    });
  }

  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).insertOne(json, (err, result) => {
          if(err) {
            reject(err);
          }else {
            resolve(result);
          }
        });
      });
    });
  }

  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).remove(json, (err, result) => {
          if(err) {
            reject(err);
          }else {
            resolve(result);
          }
        });
      });
    });
  }

  getObjectId(id) {
    return new ObjectId(id);
  }
}

module.exports = Db.getInstance();