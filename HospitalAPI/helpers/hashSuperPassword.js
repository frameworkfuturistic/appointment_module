const bcrypt = require('bcryptjs');

const superPassword = 'your_super_password'; // e.g., 'SuperSecret!'
const hashedSuperPassword = bcrypt.hashSync(superPassword, 10);
console.log(hashedSuperPassword); // Use this to set SUPER_PASSWORD_HASH in .env
