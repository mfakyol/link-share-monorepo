import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  href: {
    type: String,

    default: "",
  },
  show: {
    type: Boolean,
    default: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  removed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export { LinkSchema };

const LinkModel = mongoose.models.Link || mongoose.model("Link", LinkSchema);

export default LinkModel;
