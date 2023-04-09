const bcrypt = require('bcrypt');

const pass = 'mañana'

bcrypt.hash(pass, 10)
.then((err, hash) => {
    console.log(hash);
})