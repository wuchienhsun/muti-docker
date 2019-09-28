const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();
fib = (n) => {
  let arr = [];
  for (let i = 0; i < n + 1; i++) {
    if (i <= 1) {
      arr.push(1);
    } else {
      arr.push(arr[i - 1] + arr[i - 2])
    }
  }
  return arr[n]
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
