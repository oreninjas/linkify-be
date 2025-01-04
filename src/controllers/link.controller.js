// Hey there, let me guide you throught this file cause the name is confusing, isn't it?
// So with the name link, i meant to take reference as work releted to performing operations inside `linkify's links` !!
import linkModel from '../models/link.model.js';

const linkController = {
  create: async (req, res) => {
    const { category, description, link } = req.body;

    if (!category || !description || !link) {
      return res.status(400).json({ message: 'All fields are required !!' });
    }
    if (!category.length < 12) {
      return res.status(400).json({
        message: "Oops you've reached maximam charanters. Please try again.",
      });
    }

    await linkModel.create({
      category,
      description,
      link,
    });
  },
};

export default linkController;
