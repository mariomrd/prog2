const config = {
    port: 3000,
    jwtSecret: 'hunter2',
    saltRounds: 10,
    apiPath : '/api/v1',
    db: {
      user: 'Mario',
      password: 'marioApp123',
      database: 'petagramv1',
      host: 'localhost',
      port: 3306
    }
  };
  
  export default config;