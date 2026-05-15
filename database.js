const sqlite3 = require('sqlite3').verbose();

   class Database {
     constructor() {
       if (!Database.instance) {
         this.db = new sqlite3.Database('./incidencias.db');
         this.init();
         Database.instance = this;
       }
       return Database.instance;
     }

     init() {
       this.db.run(`
         CREATE TABLE IF NOT EXISTS incidents (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           title TEXT, category TEXT, description TEXT, media_url TEXT,
           status TEXT DEFAULT 'Pendiente'
         )
       `);
     }
   }

   const dbInstance = new Database().db;

   class IncidentRepository {
     static create(data) {
       return new Promise((resolve, reject) => {
         dbInstance.run(
           `INSERT INTO incidents (title, category, description, media_url) VALUES (?, ?, ?, ?)`,
           [data.title, data.category, data.description, data.mediaUrl],
           function(err) { err ? reject(err) : resolve({ id: this.lastID, ...data }); }
         );
       });
     }
     static getAll() {
       return new Promise((resolve, reject) => {
         dbInstance.all(`SELECT * FROM incidents`, [], (err, rows) => { err ? reject(err) : resolve(rows); });
       });
     }
     static updateStatus(id, status) {
       return new Promise((resolve, reject) => {
         dbInstance.run(`UPDATE incidents SET status = ? WHERE id = ?`, [status, id], function(err) {
           err ? reject(err) : resolve({ updated: true });
         });
       });
     }
   }
   module.exports = { IncidentRepository };