import Image from "../models/Image.js";

const getImage = async (req, res) => {
	const imageId = req.params.id;
	try {
	  const image = await Image.findById(imageId);
	  if (!image) {
		return res.status(404).json({ error: 'Image not found' });
	  }
	  res.set('Content-Type', image.mimeType);
	  res.send(image.data);
	} catch (error) {
	  res.status(500).json({ error: 'Error retrieving image' });
	}
  };

export {
	getImage
};