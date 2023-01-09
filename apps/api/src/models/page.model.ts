import mongoose from "mongoose";
import { LinkSchema } from "./link.model";
import { StyleSchema } from "./style.model";
import { SocialSchema } from "./social.model";

const PageSchema = new mongoose.Schema({
  endPoint: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  sensitiveContentAgeLimit: {
    type: String,
    default: "",
  },

  metaTitle: {
    type: String,
    default: "",
  },

  metaDescription: {
    type: String,
    default: "",
  },

  profileTitle: {
    type: String,
    default: "",
  },

  profileDescription: {
    type: String,
    default: "",
  },

  profileImage: {
    type: String,
    default: "",
  },

  styles: {
    type: StyleSchema,
    default: {},
  },

  links: {
    type: [LinkSchema],
    default: [],
  },

  socials: {
    type: [SocialSchema],
    default: [],
  },

  analistic: {
    googleAnalisticId: {
      type: String,
      default: "",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PageModel = mongoose.models.Page || mongoose.model("Page", PageSchema);

export default PageModel;
