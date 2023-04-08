const { Schema, model, models } = require("mongoose");

const personalExpenseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    concept: {
      type: String,
      required: true,
    },
    typeWithdraw: {
      type: String,
      required: true,
    },
    boxId: {
      type: Schema.Types.ObjectId,
      ref: "Box",
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    who: {
      type: String,
      required: true,
    },
    cash: Number,
    timeTransaction: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.PersonalExpense ||
  model("PersonalExpense", personalExpenseSchema);
