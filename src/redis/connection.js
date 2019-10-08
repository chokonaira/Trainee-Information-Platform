import redis from 'redis';

//Create Redis Client
let client = null;

client = redis.createClient();
client.on('connect', ()=>{
  console.log('Connected to redis......')
});

export default client;
