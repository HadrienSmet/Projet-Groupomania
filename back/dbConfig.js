
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://' + process.env.ADMIN_SECRET_NAME + ':' + process.env.ADMIN_SECRET_PASSWORD +'@cluster0.uhmcbhd.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
