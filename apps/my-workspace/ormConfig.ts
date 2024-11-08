export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Password1!',
    database: 'workshop-db',
    // the entity definition will be added later:
    entities: [],
   })