require('http').Server((req, res) => {
  const author = 'itmo282167'

  res.setHeader('X-Author', author)
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers')

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
    res.setHeader('Content-Type', 'text/html; charset=UTF-8')

    html = `
        <input id="inp" type="text" />
        <button id="bt"></button>
        <script>
            const inp = document.querySelector('#inp')
            const bt = document.querySelector('#bt')
            bt.addEventListener('click', () => {
                fetch(inp.value).then(res => res.text()).then(text => inp.value = text)
            })   
        </script>
    `

    res.end(html)
  }

  res.end(author)
}).listen(process.env.PORT)
