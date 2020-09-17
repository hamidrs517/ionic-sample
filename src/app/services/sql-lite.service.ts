import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

declare var window: any;
const SQL_DB_NAME = 'test_db';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SqlLiteService {
  dbInstance: any;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.init2();
  }

  async init2() {
    if (!this.platform.is('cordova')) {
      let db = window.openDatabase(SQL_DB_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
      this.dbInstance = browserDBInstance(db);
    } else {
      this.dbInstance = await this.sqlite.create({
        name: SQL_DB_NAME,
        location: 'default'
      });

      console.warn("dbInstance", JSON.stringify(this.dbInstance))
    }
  }

  init() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {


        db.executeSql('create table testTable(name VARCHAR(32))', [])
          .then((res) => console.log('Executed SQL', resizeTo))
          .catch(e => console.log(e));


      })
      .catch(e => console.log(e));
  }
}


export const browserDBInstance = (db) => {

  return {
    executeSql: (sql) => {
      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(sql, [], (tx, rs) => {
            resolve(rs)
          });
        });
      })
    },
    sqlBatch: (arr) => {
      return new Promise((r, rr) => {
        let batch = [];
        db.transaction((tx) => {
          for (let i = 0; i < arr.length; i++) {
            batch.push(new Promise((resolve, reject) => {
              tx.executeSql(arr[i], [], () => { resolve(true) })
            }))
            Promise.all(batch).then(() => r(true));
          }
        });
      })
    }
  }
}