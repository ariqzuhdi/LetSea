const response = (statusCode, messages, result, res) => {
  res.json({
    payload: {
      messages: messages,
      status_Code: statusCode,
      datas: result,
    },
  });
};

module.exports = response;
