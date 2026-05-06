async function main() {
  const csrfRes = await fetch('http://localhost:3000/api/auth/csrf');
  const csrfData = await csrfRes.json();
  const csrfToken = csrfData.csrfToken;
  const cookie = csrfRes.headers.get('set-cookie').split(';')[0];

  const data = new URLSearchParams();
  data.append('username', 'test_admin_debug@cmhsports.com');
  data.append('password', 'password123');
  data.append('csrfToken', csrfToken);

  const loginRes = await fetch('http://localhost:3000/api/auth/callback/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': cookie
    },
    body: data.toString(),
    redirect: 'manual'
  });
  
  const rawCookies = loginRes.headers.get('set-cookie');
  // extract just the session token
  const sessionTokenMatch = rawCookies.match(/next-auth\.session-token=([^;]+)/);
  const sessionToken = sessionTokenMatch ? sessionTokenMatch[0] : '';
  
  console.log('Sending Cookie:', sessionToken);
  
  const adminRes = await fetch('http://localhost:3000/admin', {
    headers: {
      'Cookie': sessionToken
    },
    redirect: 'manual'
  });
  console.log('Admin route status:', adminRes.status);
  console.log('Admin route location:', adminRes.headers.get('location'));
  console.log('x-debug-token:', adminRes.headers.get('x-debug-token'));
}
main().catch(console.error);
