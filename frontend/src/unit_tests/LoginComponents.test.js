import ForgotPass from '../components/loginComponents/ForgotPass';
import Login from '../components/loginComponents/Login'
import Register from '../components/loginComponents/Register';

test("login is defined", () => {
    expect(Login).toBeDefined();
});

test("register is defined", () => {
    expect(Register).toBeDefined();
});

test("ForgotPass is defined", () => {
    expect(ForgotPass).toBeDefined();
});
