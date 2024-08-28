// nous pouvons implémenter des schémas de données stricts, qui permettent de 
// rendre notre application plus robuste. Commençons par créer un schéma Thing (« chose ») 
// pour tout objet mis en vente dans notre application.
const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);