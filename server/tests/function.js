const axios = require('axios');

const makeMultipleCalls = async () => {
  const promises = [];

  for (let i = 0; i < 101; i++) {
    promises.push(
      axios.get('http://localhost:3000/ping').catch(err => ({ error: true, message: err.message }))
    );
  }

  const results = await Promise.all(promises);
  return results;
};

// Usage
makeMultipleCalls().then(data => {
  console.log(data);
});
