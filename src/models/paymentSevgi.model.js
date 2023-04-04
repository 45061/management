const { Schema, model, models } = require("mongoose");

const paymentSevgiSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    concept: {
      type: String,
      required: true,
    },
    typePayment: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    reasonOfPay: {
      type: String,
      required: true,
    },
    roomId: {
      type: String,
      required: true,
    },
    boxId: {
      type: Schema.Types.ObjectId,
      ref: "Box",
      required: true,
    },
    cash: String,
    timeTransaction: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.PaymentSevgi || model("PaymentSevgi", paymentSchema);
