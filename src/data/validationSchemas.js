import Joi from "joi";

const validationSchema = Joi.object({
  storeName: Joi.string()
    .min(4)
    .max(22)
    .required()
    .pattern(/^[a-zA-ZåäöÅÄÖ\s,.-]*$/),

  storeDescription: Joi.string()
    .min(5)
    .max(110)
    .required()
    .pattern(/^[a-zA-ZåäöÅÄÖ\s,.]*$/),

  storePrice: Joi.number().positive().precision(2).required().min(0).precision(2),

  storeImg: Joi.string().uri().required(),
});

function validateInput(Form, touchedInput) {
  let css = {
    name: "",
    description: "",
    price: "",
    img: "",
  };
  if (touchedInput.name) css.name = "invalid";
  if (touchedInput.description) css.description = "invalid";
  if (touchedInput.price) css.price = "invalid";
  if (touchedInput.img) css.img = "invalid";

  let message = {
    name: "",
    description: "",
    price: "",
    img: "",
  };
  const results = validationSchema.validate(Form, { abortEarly: false });
  //   console.log(results);

  if (results.error) {
    results.error.details.forEach((e) => {
      const key = e.context.key;
      if (!touchedInput[key]) {
        css[key] = "invalid";
      }
      const regex = /^[a-zA-ZåäöÅÄÖ\s,.]*$/;

      if (key === "storeName") {
        message.name = "Enter a toy name (minimum 4 characters.";
        if (Form.storeName.length > 22) {
          message.name = "Maximum 22 characters allowed for the name.";
        }

        if (!regex.test(Form.storeName)) {
          message.name = "Only (a-z, åäö,.), commas, periods, and spaces are allowed.";
        }
      } else if (key === "storeDescription") {
        message.description = "Provide a description of the toy (minimum 5 characters)";
        if (Form.storeDescription.length > 110) {
          message.description = "Maximum 110 characters allowed for the description.";
        }
        if (!regex.test(Form.storeDescription)) {
          message.description = "Only (a-z, åäö,.), commas, periods, and spaces are allowed.";
        }
      } else if (key === "storePrice") {
        message.price = "Enter a valid price for the toy.";
        if (Form.storePrice < 0) {
          message.price = "Price cannot be less than 0.";
        }
      } else if (key === "storeImg") {
        message.img = "Enter a valid image URL for the toy..";
      }
    });
  }
  const isFormValid = !results.error;
  // console.log("isFormValid:", isFormValid);
  return { css, message, isFormValid };
}

export { validateInput };
