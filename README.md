# express-bridge

Transforms express middleware in muneem middleware

```
npm install express-bridge
```

```js
const app = require("muneem")();
const bridge = require("express-bridge");
const cookieParser = require("cookie-parser"); //express middleware

app.use( bridge, cookieParser() );
app.get("/test", (req, res) =>{
    //..
})

app.start();
```