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
  fetch: (req, res) => {
    // this will fetch some linkifies!
    res.send('Hello world!');
  },
  fetchOne: (req, res) => {
    res.send('Hello world!');
  },
  delete: (req, res) => {
    res.send('Hello world!');
  },
};

export default linkify;
