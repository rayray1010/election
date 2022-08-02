exports.CustomError = class CustomError extends Error {
  constructor(errorMsg, { toClientMsg = errorMsg }) {
    super(errorMsg);
    this.toClientMsg = toClientMsg;
    this.errorAt = Date.now();
  }
};
