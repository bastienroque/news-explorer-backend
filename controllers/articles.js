import Article from "../models/article.js";

export const getArticles = (req, res, next) => {
  console.log("user:", req.user);
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

export const createArticle = (req, res, next) => {
  const { keyword, title, description, date, source, url, image } = req.body;

  Article.create({
    keyword,
    title,
    description,
    date,
    source,
    url,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      const articleObj = article.toObject();

      delete articleObj.owner;
      delete articleObj.__v;

      res.status(201).send(articleObj);
    })
    .catch(next);
};

export const saveArticle = (req, res, next) => {
  Article.findByIdAndUpdate(
    req.params.articleId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((article) => res.send(article))
    .catch(next);
};

export const removeArticle = (req, res, next) => {
  Article.findByIdAndUpdate(
    req.params.articleId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((article) => res.send(article))
    .catch(next);
};
