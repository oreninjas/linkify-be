// Hey there, let me guide you throught this file cause the name is confusing, isn't it?
// So with the name link, i meant to take reference as work releted to performing operations inside `linkify's links` !!
import linkModel from '../models/link.model.js';
import linkifyModel from '../models/linkify.model.js';

const linkController = {
  create: async (req, res) => {
    try {
      const user = req.user;
      const { category, description, link } = req.body;
      const { linkifyId } = req.params;

      let linkifyDoc = await linkifyModel.findOne({
        _id: linkifyId,
      });

      if (!category || !description || !link) {
        return res.status(400).json({ message: 'All fields are required !!' });
      }
      if (category.length > 20) {
        return res.status(400).json({
          message: "we've reached maximam charanters. Please try again.",
        });
      }

      let newLink = await linkModel.create({
        createdBy: user._id,
        category,
        description,
        link,
      });

      if (!newLink) {
        return res.status(500).json({ message: 'Inicial server error.' });
      }

      linkifyDoc.categories.push(newLink._id);
      await linkifyDoc.save();

      res.status(201).json({ newLink });
    } catch (error) {
      console.log(
        `There was some issue in link create controller ${error.message}`,
      );
      return res.status(500).json({ message: 'inicial server error.' });
    }
  },
};

export default linkController;
