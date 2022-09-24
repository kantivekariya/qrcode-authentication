import mongoose from "mongoose";

const schema = mongoose.Schema;

const qrCodeSchema = new schema({
  qrcode: {
    type: String,
    required: true,
  },
});

const qrCodeModel = mongoose.model("qrcode", qrCodeSchema);
export { qrCodeModel };
