const { Schema, model, models } = require("mongoose");

const roomSevgiSchema = new Schema(
  {
    roomNumer: {
      required: true,
      type: String,
      validate: [
        {
          validator(value) {
            return models.RoomSevgi.findOne({ roomNumer: value })
              .then((room) => !room)
              .catch(() => false);
          },
          message: "Ya existe una habitacion registrado con ese numero",
        },
      ],
    },
    bookings: {
      type: [{ type: Schema.Types.ObjectId, ref: "BookingSevgi" }],
    },
    price: {
      required: true,
      type: String,
    },
    sypplies: {
      type: [{ type: Schema.Types.ObjectId, ref: "Supplies" }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.RoomSevgi || model("RoomSevgi", roomSevgiSchema);
