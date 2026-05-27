import Article from "../models/article.js";

export const getArticles = async (req, res, next) => {
  try {
    console.log("user:", req.user);
    const articles = await Article.find({ owner: req.user._id });
    res.send(articles);
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const { keyword, title, description, date, source, url, image } = req.body;

    const article = await Article.create({
      keyword,
      title,
      description,
      date,
      source,
      url,
      image,
      owner: req.user._id,
    });

    const articleObj = article.toObject();
    delete articleObj.owner;
    delete articleObj.__v;

    res.status(201).send(articleObj);
  } catch (error) {
    next(error);
  }
};

export const removeArticle = async (req, res, next) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.articleId,
      owner: req.user._id,
    }).orFail();

    res.send(article);
  } catch (error) {
    next(error);
  }
};
