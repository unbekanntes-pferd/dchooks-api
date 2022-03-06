

export default () => {

  return ({
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST,
    database: {
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DATABASE,
      testDatabase: process.env.POSTGRES_TEST_DATABASE,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    },
    rabbit: {
      url: process.env.RABBIT_MQ_HOST
    },
   dracoon: {
       url: process.env.DRACOON_BASE_URL
   }
  });

} 
