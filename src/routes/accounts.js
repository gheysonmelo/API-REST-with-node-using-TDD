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

    const get = (req, res) => {
        app.services.account.find({ id: req.params.id }).then((result) => {
            return res.status(201).json(result);
        });
    };

    return { getAll, create, get };
};
