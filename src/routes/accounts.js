module.exports = (app) => {
    const getAll = (req, res) => {
        app.services.account.findAll().then((result) => {
            return res.status(200).json(result);
        });
    };

    const create = (req, res) => {
        app.services.account.save(req.body).then((result) => {
            if (result.error) return res.status(400).json(result);
            return res.status(201).json(result[0]);
        });
    };

    const get = (req, res) => {
        app.services.account.find({ id: req.params.id }).then((result) => {
            return res.status(201).json(result);
        });
    };

    const update = (req, res) => {
        app.services.account
            .update(req.params.id, req.body)
            .then((result) => res.status(200).json(result[0]));
    };

    const remove = (req, res) => {
        app.services.account.remove(req.params.id).then(() => res.status(204).send());
    };

    return { getAll, create, get, update, remove };
};
