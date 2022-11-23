module.exports = (app) => {
    const findAll = () => {
        return app.db("accounts");
    };

    const save = (account) => {
        return app.db("accounts").insert(account, "*");
    };

    const find = (filter = {}) => {
        return app.db("accounts").where(filter).first();
    };

    return { findAll, save, find };
};
