import "./styles/Login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setHandleLogin }) => {
  const navigate = useNavigate();
  const url = "https://new-crud-ly68.onrender.com/api/v1/users/login";
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = (data) => {
    reset();
    axios
      .post(url, data)
      .then((res) => {
        setHandleLogin(res.data);
        navigate("/");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  };

  return (
    <section className="login">
      <article className="login__container">
        <h2 className="login__title">Login</h2>
        <form onSubmit={handleSubmit(submit)} className="login__form">
          <div className="login__item">
            <label>email</label>
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              placeholder="example@mail.com"
            />
            {errors.email && <span className="login__error">*</span>}
          </div>
          <div className="login__item">
            <label>password</label>
            <input
              {...register("password", { required: true })}
              name="password"
              type="password"
            />
            {errors.password && <span className="login__error">*</span>}
          </div>
          <button className="login__btn">Submit</button>
        </form>
        <ul className="login__footer">
          <li>
            <Link className="link" to={"/recover"}>
              Recuperar Contraseña
            </Link>
          </li>
          <li>
            <Link className="link" to={"/register"}>
              registrarse
            </Link>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default Login;
