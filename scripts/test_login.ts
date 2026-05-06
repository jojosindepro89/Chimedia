async function test() {
  const res = await fetch('http://localhost:3000/api/auth/callback/credentials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: 'admin@cmhsports.com',
      password: 'password123',
      redirect: false,
    })
  })
  console.log(res.status)
  console.log(await res.text())
}
test()
