import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: Buffer, required: true },
  mimeType: { type: String, required: true },
  /*
  contentType: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, required: true },
  description: { type: String, required: true },*/
});

const imageModel = mongoose.model("Image", ImageSchema);

export default imageModel;