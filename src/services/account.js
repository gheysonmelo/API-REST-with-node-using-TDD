module.exports = (app) => {
    const findAll = () => {
        return app.db("accounts");
    };

    const save = (account) => {
        return app.db("accounts").insert(account, "*");
    };

    return { findAll, save };
};
