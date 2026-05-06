async function main() {
  const csrfRes = await fetch('http://localhost:3000/api/auth/csrf');
  const csrfData = await csrfRes.json();
  const csrfToken = csrfData.csrfToken;
  const cookie = csrfRes.headers.get('set-cookie').split(';')[0];

  const data = new URLSearchParams();
  data.append('username', 'admin@cmhsports.com');
  data.append('password', 'password');
  data.append('csrfToken', csrfToken);

  console.log('Sending login...');
  const start = Date.now();
  const res = await fetch('http://localhost:3000/api/auth/callback/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': cookie
    },
    body: data.toString(),
    redirect: 'manual'
  });
  console.log('STATUS:', res.status, 'Time:', Date.now() - start, 'ms');
  console.log('Headers:', res.headers);
}
main().catch(console.error);
