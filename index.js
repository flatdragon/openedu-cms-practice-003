require('http').Server((req, res) => {
  const author = 'itmo282167'

  const headers = {
    'X-Author': author,
    'Content-Type': 'text/plain; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers',
  }

  res.writeHead(200, headers)

  if (req.url === '/login/') {
    return res.end(author)
  }

  if (req.url === '/promise/') {
    return function task(x) {
      return new Promise((resolve, reject) => {
        x < 18 ? resolve('yes') : reject('no')
      })
    }
  }

  if (req.url === '/fetch/') {
    res.writeHead(200, {
      ...headers,
      'Content-Type': 'text/html',
    })

    html = `
        <input id="inp" type="text">
        <button id="bt"></button>
        <script>
            const inp = document.querySelector('#inp')
            const bt = document.querySelector('#bt')
            fetch(inp.value).then(res => res.text()).then(text => inp.value = text)   
        </script>
    `

    res.end(html)
  }

  res.end(author)
}).listen(process.env.PORT)
