const request = require("supertest");

const app = require("../../src/app");

const email = `${Date.now()}@hotmail.com`;

test("Deve listar todos os usuários", () => {
    return request(app)
        .get("/users")
        .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
        });
});

test("Deve inserir usuário com sucesso", () => {
    return request(app)
        .post("/users")
        .send({ name: "Walter Mitty", email, password: "123456" })
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe("Walter Mitty");
            expect(res.body).not.toHaveProperty("password");
        });
});

test("Deve armazenar senha criptografaada", async () => {
    const res = await request(app)
        .post("/users")
        .send({ name: "Walter Mitty", email: `${Date.now()}@hotmail.com`, password: "123456" });
    expect(res.status).toBe(201);

    const { id } = res.body;
    const userDB = await app.services.user.findOne({ id });
    expect(userDB.password).not.toBeUndefined();
    expect(userDB.password).not.toBe("123456");
});

test("Não deve inserir usuário sem nome", () => {
    return request(app)
        .post("/users")
        .send({ email: "walter@hotmail.com", password: "123456" })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Nome é um atributo obrigatório");
        });
});

test("Não deve inserir usuáro sem email", async () => {
    const result = await request(app)
        .post("/users")
        .send({ name: "Walter Mitty", password: "123456" });
    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Email é um atributo obrigatório");
});

test("Não deve inserir usuáro sem senha", (done) => {
    request(app)
        .post("/users")
        .send({ name: "Walter Mitty", email: "walter@hotmail.com" })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Senha é um atributo obrigatório");
            done();
        })
        .catch((err) => done.fail(err));
});

test("Não deve inserir usuáro com email existente", () => {
    return request(app)
        .post("/users")
        .send({ name: "Walter Mitty", email, password: "123456" })
        .then((res) => {
            expect(res.status).toBe(400);
            expect(res.body.error).toBe("Já existe um usuário com esse email");
        });
});
