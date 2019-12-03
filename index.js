const express = require('express')
const app = express()
const port = 3000
const {getMiddleware} = require('./swagger/middleware');
const controllers = require('./controllers');

app.get('/', (req, res) => res.send('Hello World!'));

(async function() {
    let middleware = await getMiddleware({controllers});
    
    app.use(middleware);
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})();
