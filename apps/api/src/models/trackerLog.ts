import mongoose from "mongoose";

const TrackerLogSchema = new mongoose.Schema({
  endPointId: {
    index: true,
    type: mongoose.Types.ObjectId,
    ref: "page",
  },
  browserId: {
    index: true,
    type: String,
  },

  linkId: {
    type: mongoose.Types.ObjectId,
  },

  socialId: {
    type: mongoose.Types.ObjectId,
  },

  type: {
    index: true,
    type: String,
  },

  device: {
    type: String,
    default: "unknown",
  },

  language: {
    type: String,
    default: "unknown",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export { TrackerLogSchema };

const TrackerLogModel = mongoose.models.TrackerLog || mongoose.model("TrackerLog", TrackerLogSchema);

export default TrackerLogModel;
