import { useForm } from "react-hook-form";
import "./styles/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const url = "https://new-crud-ly68.onrender.com/api/v1/users";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submit = (data) => {
    data.roleId = data.roleId ? 2 : 1;
    reset();
    axios
      .post(url, data)
      .then((res) => navigate("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <section className="register">
      <article className="register__container">
        <h2 className="register__title">Register</h2>

        <form onSubmit={handleSubmit(submit)}>
          <div className="register__item">
            <label>email</label>
            <input
              {...register("email", { required: true })}
              name="email"
              type="email"
              placeholder="example@mail.com"
            />
            {errors.email && <span className="register__error">*</span>}
          </div>
          <div className="register__item">
            <label>password</label>
            <input
              {...register("password", { required: true })}
              name="password"
              type="password"
            />
            {errors.password && <span className="register__error">*</span>}
          </div>
          <div className="register__item check">
            <label>admin?</label>
            <input {...register("roleId")} name="admin" type="checkbox" />
          </div>
          <button className="register__btn">Submit</button>
        </form>
      </article>
    </section>
  );
};

export default Register;
