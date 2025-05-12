const createFundRaise = require("../../service/fundraiseService/createFundRaise");

const createFundRaiseController = catchAsync(async (req, res) => {
    const id = await getId(req, res);
    const { page, category } = req.query;

    try {
        const { code, message, data } = await getAllFundRaises({
            page,
            category,
            createdBy: id
        });

        handleResponse(res, code, message, data);
    } catch (error) {
        handleResponse(
            res,
            500,
            (message = "Internal Server Error, Contact Dev team"),
            (data = undefined)
        );
    }
});

module.exports = createFundRaiseController;
