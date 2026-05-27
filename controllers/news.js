export const getNews = async (req, res, next) => {
  try {
    const q = req.query.q || "technology";

    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 7);

    const url = `https://newsapi.org/v2/everything?q=${q}&from=${pastDate.toISOString()}&to=${today.toISOString()}&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data.articles);
  } catch (err) {
    next(err);
  }
};
