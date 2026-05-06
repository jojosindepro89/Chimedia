const { getToken } = require('next-auth/jwt');
require('dotenv').config();

async function main() {
  const req = {
    cookies: {
      'next-auth.session-token': process.argv[2]
    },
    headers: {}
  };
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Decoded Token:', token);
}
main();
