import mongoose from "mongoose";

const StyleSchema = new mongoose.Schema({
  backgroundType: {
    type: String,
    default: "",
  },


  backgroundColor: {
    type: String,
    default: "",
  },

  backgroundImage: {
    type: String,
    default: "",
  },


  avatar: {
    type: String,
    default: "",
  },

  avatarType: {
    type: String,
    default: "",
  },

  fontFamily: {
    type: String,
    default: "",
  },

  fontColor: {
    type: String,
    default: "",
  },

  link: {
    style: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    backgroundColor: {
      type: String,
      default: "",
    },

    borderColor: {
      type: String,
      default: "",
    },

    shadowColor: {
      type: String,
      default: "",
    },
  },

  social: {
    style: {
      type: String,
      default: "color",
    },

    position: {
      type: String,
      default: "top",
    },
  },
});

export { StyleSchema };

const StyleModel = mongoose.models.Style || mongoose.model("Style", StyleSchema);

export default StyleModel;
