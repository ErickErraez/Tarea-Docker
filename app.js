const { default: axios } = require('axios');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const images = [
    'https://www.lego.com/cdn/cs/set/assets/blt2ba1982885f30283/03_Star-Wars-25th-Anniv-Campaign-Feb_Character-intro-panel_Desktop_02.png',
    'https://www.lego.com/cdn/cs/set/assets/bltc1fe076df793b9f5/75383.png',
    'https://www.lego.com/cdn/cs/set/assets/bltde62e4576a817dd4/75349.png'
  ];
  res.render('index', { images });
});

app.post('/analyze', async (req, res) => {
  const apiKey = 'acc_5861dc5e242a954';
  const apiSecret = 'a8ee64a8eecbcccec086983cda076b01';
  const images = [
    'https://www.lego.com/cdn/cs/set/assets/blt2ba1982885f30283/03_Star-Wars-25th-Anniv-Campaign-Feb_Character-intro-panel_Desktop_02.png',
    'https://www.lego.com/cdn/cs/set/assets/bltc1fe076df793b9f5/75383.png',
    'https://www.lego.com/cdn/cs/set/assets/bltde62e4576a817dd4/75349.png'
  ];

  try {
    const results = [];
    for (const image of images) {
      const url = `https://api.imagga.com/v2/tags?image_url=${encodeURIComponent(image)}`;

      const response = await axios.get(url,
         {
          auth: {
            username: apiKey,
            password: apiSecret
          },
        responseType: 'json' // Indica a got que el cuerpo de la respuesta es JSON
      });
      const tags = response.data.result.tags.slice(0, 2); // Obtener las 2 primeras etiquetas
      results.push({ image, tags });
    }

    res.render('results', { results });
  } catch (error) {
    console.error('Error analyzing images:', error.message);
    res.status(500).send('Error analyzing images');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
