import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./imgs/izemak.jpeg";
import styles from "./login.module.css";
import Swal from "sweetalert2";
export default function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name: username,
      email: email,
      password: password,
    };

    fetch("https://www.izemak.com/azimak/public/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.msg,
          });
        }
      })
      .then((res) => {
        if (res.access_token) {
          localStorage.setItem("token", res.access_token);
          localStorage.setItem("pageLoader", true); 
          navigate("/home");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.msg,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={`${styles.form_container}`}>
          <div className={`${styles.form_img}`}>
            <img src={logo} alt="logo not found" />
          </div>
          <form className={`${styles.form}`} onSubmit={handleSubmit}>
            <input
              type="text"
              className={`${styles.input}`}
              placeholder="إسم المستخدم"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className={`${styles.input}`}
              placeholder="كلمة المرور"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="email"
              className={`${styles.input}`}
              placeholder="ادخل الاميل"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className={`${styles.button}`}>
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
