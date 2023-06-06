const response = (statuscode, data, message, res) => {
    res.json(statuscode, [{
        message,
        payload: {
            data
        }
    }])


}

module.exports = response