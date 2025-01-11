// Hey there, let me guide you throught this file cause the name is confusing, isn't it?
// So with the name link, i meant to take reference as work releted to performing operations inside `linkify's links` !!
import linkifyModel from '../models/linkify.model.js';
import categorySchema from '../models/category.model.js';
import linkModel from '../models/link.model.js';
import mongoose from 'mongoose';

const linkController = {
  create: async (req, res) => {
    try {
      const user = req.user;
      const { header, description, link } = req.body;
      console.log(header); // testing
      const { id } = req.params; // linkify id
      if (!header || !description || !link) {
        return res.status(400).json({ message: 'All fields are required !!' });
      }

      let linkify = await linkifyModel.findById(id);
      if (!linkify)
        return res.status(404).json({ message: 'linkify not found' });
      console.log(linkify);

      const newLink = await linkModel.create({
        description,
        link,
      });

      // if client gives category id && works
      let category;
      if (mongoose.Types.ObjectId.isValid(header)) {
        category = await categorySchema.findById(header);
      } else {
        category = await categorySchema.create({
          createdBy: user._id,
          header,
        });
      }

      category.links.push(newLink._id);
      await category.save();

      linkify.categories.push(category._id);
      await linkify.save();

      res.status(201).json({ newLink });
    } catch (error) {
      console.log(
        `There was some issue in link create controller ${error.message}`,
      );
      return res.status(500).json({ message: 'inicial server error.' });
    }
  },
  fetchOneCategory: async (req, res) => {
    try {
      const { id } = req.params; // category id

      const category = await categorySchema.findById(id);

      const links = await linkModel.find({ _id: { $in: category.links } });

      res.status(200).json(links);
    } catch (error) {
      res.status(500).json({ message: 'server error please try again.' });
    }
  },
};

export default linkController;
