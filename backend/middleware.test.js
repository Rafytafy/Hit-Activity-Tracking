const isAuthenticated = require('./middleware');

test("isAuthenticated function exists", () => {
    expect(isAuthenticated).toBeDefined();
  });
