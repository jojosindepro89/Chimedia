const http = require('http');

const data = new URLSearchParams();
data.append('username', 'admin@cmhsports.com');
data.append('password', 'password');
data.append('csrfToken', 'dummy');

const req = http.request('http://localhost:3000/api/auth/callback/credentials', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(data.toString())
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
});

req.on('error', console.error);
req.write(data.toString());
req.end();
