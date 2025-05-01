const handleResponse = (res, code, message, data) => {
  const statusCode = statusCodeMap[code];

  return res.status(statusCode).send(
    formatResponse({
      message: message,
      data: data
    })
  );
};

module.exports = handleResponse;
