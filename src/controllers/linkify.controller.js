import linkifyModel from '../models/linkify.model.js';

const linkify = {
  create: async (req, res) => {
    try {
      const { title, description, categories } = req.body;
      const user = req.user; // need user for signing FK

      if (!title || !description) {
        return res
          .status(400)
          .json({ message: 'title and description are required' });
      }

      if (categories?.length < 5) {
        return res.status(400).json({ message: 'oops, too many categories' });
      }

      let newLinkify = await linkifyModel.create({
        createdBy: user._id,
        title,
        description,
        categories,
      });

      res.status(201).json(newLinkify);
    } catch (error) {
      console.log(
        `error occured in create linkify controller, ${error.message}`,
      );
      res.status(500).json({ error: 'inicial server error' });
    }
  },
  fetch: async (req, res) => {
    try {
      const pages = req.query.p || 1;
      const limit = 3;

      const response = await linkifyModel
        .find()
        .skip(pages * limit)
        .limit(limit);

      res.json(response);
    } catch (error) {
      console.log(
        `error occured in fetch one linkify controller, ${error.message}`,
      );
      res.status(500).json({ error: 'inicial server error' });
    }
  },
  fetchOne: async (req, res) => {
    try {
      const fetchThisId = req.params.id;

      const response = await linkifyModel.findOne({ _id: fetchThisId });

      if (response.isPublished === false) {
        return response.status(500).json({ message: 'linkify is private' });
      }

      res.status(200).json(response);
    } catch (error) {
      console.log(
        `error occured in fetch one linkify controller, ${error.message}`,
      );
      res.status(500).json({ error: 'inicial server error' });
    }
  },
  delete: async (req, res) => {
    try {
      const linkifyId = req.params.id;
      const user = req.user;

      if (!linkifyId) {
        return res.status(404).json({ message: 'not found!' });
      }

      await linkifyModel.deleteOne({ _id: linkifyId, createdBy: user._id });

      res.status(200).json({ message: 'deletion success' });
    } catch (error) {
      console.log(
        `error occured in delete linkify controller, ${error.message}`,
      );
      res.status(500).json({ error: 'inicial server error' });
    }
  },
};

export default linkify;
