import mongoose from "mongoose";

const schema = mongoose.Schema;

const qrCodeSchema = new schema({
  qrcode: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
});

const QrCodeModel = mongoose.model("qrcode", qrCodeSchema);
export { QrCodeModel };
