// Hey there, let me guide you throught this file cause the name is confusing, isn't it?
// So with the name link, i meant to take reference as work releted to performing operations inside `linkify's links` !!
import linkifyModel from '../models/linkify.model.js';
import categorySchema from '../models/category.model.js';
import linkModel from '../models/link.model.js';

const linkController = {
  create: async (req, res) => {
    try {
      const user = req.user;
      const { header, description, link } = req.body;
      const { linkifyId } = req.params;

      let linkifyDoc = await linkifyModel.findOne({
        _id: linkifyId,
      });

      if (!header || !description || !link) {
        return res.status(400).json({ message: 'All fields are required !!' });
      }
      if (header.length > 20) {
        return res.status(400).json({
          message: "we've reached maximam charanters. Please try again.",
        });
      }

      // made here cause might change .save() --> updateOne();
      let newLink = await linkModel.create({
        description,
        link,
      });

      let newCategory = await categorySchema.create({
        createdBy: user._id,
        header,
      });

      newCategory.links.push(newLink._id);
      await newCategory.save();

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
  fetchOneCategory: async (req, res) => {
    const { id } = req.params; // category id

    const category = await categorySchema.findById(id);

    const links = await linkModel.find({ _id: { $in: category.links } });

    res.status(200).json(links);
  },
};

export default linkController;
