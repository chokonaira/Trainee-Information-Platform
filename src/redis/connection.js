import redis from 'redis';

//Create Redis Client
let client = null;

client = redis.createClient(process.env.REDIS_URL);
client.on('connect', ()=>{
  console.log('Connected to redis......')
});

export default client;
