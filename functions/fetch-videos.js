const https = require('https');
const options = {
  hostname: 'sela-test.herokuapp.com',
  port: 443,
  path: '/assets/hkzxv.json',
  method: 'GET'
};

exports.handler = (event, context, callback) => {
    let data = '';
    const req = https.request(options, (res) => {
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => callback(null, JSON.parse(data)));
    });
    req.on('error', (e) => console.error(e));
    req.end();
};
