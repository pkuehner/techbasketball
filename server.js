const express = require('express');
const app = express();

app.use(express.static('./dist/angular-blog-clean'));

app.listen(4200, () => console.log('Gator app listening on port 4200!'));
