module.exports = (app) => {
    const getAll = (req, res) => {
        app.services.account.findAll().then((result) => {
            return res.status(200).json(result);
        });
    };

    const create = (req, res) => {
        app.services.account.save(req.body).then((result) => {
            return res.status(201).json(result[0]);
        });
    };

    return { getAll, create };
};
