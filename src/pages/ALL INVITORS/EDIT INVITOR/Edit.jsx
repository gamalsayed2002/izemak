import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Loader from "../../../COMPONENTS/LOADER/Loader";

export default function Edit() {
  let [loader, setLoader] = useState(true);
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [maxScan, setMaxScan] = useState("");
  let [status, setStatus] = useState("");
  let { id } = useParams();
  let naviation = useNavigate();

  let getData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must log in",
      });
      naviation("/");
    }
    fetch(`https://www.izemak.com/azimak/public/api/profile/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.msg,
        });
      })
      .then((res) => {
        setLoader(false);
        setName(res.data.name);
        setPhone(res.data.phoneNumber);
        setMaxScan(res.data.maxScan);
        setStatus(res.data.status);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);

  let submitF = (e) => {
    e.preventDefault();
    fetch("https://www.izemak.com/azimak/public/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
        Accept: "application/json", // Optional: Add authorization token if needed
      },
      body: JSON.stringify({
        id: id,
        phoneNumber: phone,
        name: name,
        maxScan: maxScan,
        status: status,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.msg === "invitor informations updated successfully") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          window.history.back();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.msg,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
        });
      });
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <motion.div className="main_form_container center">
            <form className="main_form center" onSubmit={submitF}>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                تعديل البيانات
              </motion.h2>

              <div className={`input_container`}>
                <motion.label
                  htmlFor="name"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {" "}
                  الإسم
                </motion.label>
                <motion.input
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  value={name}
                  type="text"
                  id="name"
                  placeholder=" مكان الحفل"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className={`input_container`}>
                <motion.label
                  htmlFor="phone"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {" "}
                  رقم الهاتف
                </motion.label>
                <motion.input
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  value={phone}
                  type="text"
                  id="phone"
                  placeholder=" مكان الحفل"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>

              <div className={`input_container`}>
                <motion.label
                  htmlFor="maxScan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {" "}
                  عدد مرات القرائة
                </motion.label>
                <motion.input
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  value={maxScan}
                  type="text"
                  id="maxScan"
                  placeholder=" مكان الحفل"
                  onChange={(e) => {
                    setMaxScan(e.target.value);
                  }}
                />
              </div>

              <div
                className="input_container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.label
                  htmlFor="status"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  الحالة
                </motion.label>
                <motion.select
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  id="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="invited">invited</option>
                  <option value="accepted">accepted</option>
                  <option value="rejected">rejected</option>
                </motion.select>
              </div>

              <motion.button
                type="submit"
                className="center btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                تعديل
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </>
  );
}
