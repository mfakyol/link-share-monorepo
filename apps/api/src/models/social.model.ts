import mongoose from "mongoose";

const SocialSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },

  show: {
    type: Boolean,
    default: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export { SocialSchema };

const SocialModel = mongoose.models.Social || mongoose.model("Social", SocialSchema);

export default SocialModel;
