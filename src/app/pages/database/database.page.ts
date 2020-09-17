import { Component, OnInit } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SqlLiteService } from 'src/app/services/sql-lite.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.page.html',
  styleUrls: ['./database.page.scss'],
  providers: [SQLite]

})
export class DatabasePage implements OnInit {

  constructor(private sqlLiteService: SqlLiteService) { }

  ngOnInit() {
    // this.sqlLiteService.init()
  }

  async ionViewDidLoad() {
    // await this.sqlLiteService.dbInstance.executeSql('CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY, name)');
    // await this.sqlLiteService.dbInstance.executeSql(`INSERT INTO user(id, user) VALUES (1, 'Suraj')`);
    // await this.sqlLiteService.dbInstance.executeSql(`INSERT INTO user(id, user) VALUES (2, 'hamid')`);
    // await this.sqlLiteService.dbInstance.executeSql(`INSERT INTO user(id, user) VALUES (3, 'omid')`);
    let users = await this.sqlLiteService.dbInstance.executeSql('SELECT * FROM user');
    console.log("users", users);
  }
}
