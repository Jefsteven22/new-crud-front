import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./styles/RecoverPassword.css";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const url = "https://new-crud-ly68.onrender.com/api/v1/users/recover";
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
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="login ">
      <article className="login__container recover">
        <h2 className="login__title">Recover Password</h2>
        <form onSubmit={handleSubmit(submit)} className="login__form">
          <div className="login__item recover__item">
            <label>Email</label>
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              placeholder="example@mail.com"
            />
            {errors.email && <span className="login__error">*</span>}
          </div>
          <div className="login__item recover__item">
            <label>New password</label>
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
            <Link className="link" to={"/login"}>
              Login
            </Link>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default RecoverPassword;
