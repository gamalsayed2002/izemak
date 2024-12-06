import { useEffect, useRef, useState } from "react";
import styles from "./add_invitors.module.css";
import Loader from "../../COMPONENTS/LOADER/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { LuMenu } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import info_icon from "./imgs/info.512x512.png";
export default function Add_invitors() {
  const [loader, setLoader] = useState(true);
  const menuRef = useRef();
  let [data, setData] = useState([]);

  let { partyID } = useParams();
  let navigation = useNavigate();
  let [file, setFile] = useState(null);
  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [maxScan, setMaxScan] = useState("");
  //   const [file, setFile] = useState(null);
  const getData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must log in",
      });
      navigation("/");
      return;
    }
    fetch(`https://www.izemak.com/azimak/public/api/party/${partyID}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data.members);
    setLoader(false);
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

  //

  // upload file

  //   function handelUpload(file) {
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "success",
  //       title: "Your work has been saved",
  //       showConfirmButton: true, // Show the confirm button
  //       confirmButtonText: "OK", // Customize the button text
  //       timer: 1500,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const fd = new FormData();
  //         fd.append("file", file);
  //         fetch("https://www.izemak.com/azimak/public/api/addexcel", {
  //           method: "POST",
  //           body: fd,
  //         })
  //           .then((res) => {
  //             if (res.ok) {
  //               Swal.fire({
  //                 position: "top-end",
  //                 icon: "success",
  //                 title: "Your work has been saved",
  //                 showConfirmButton: false,
  //                 timer: 1500,
  //               });
  //               setTimeout(() => {
  //                 window.location.reload();
  //               }, 1500);
  //             }
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             Swal.fire({
  //               icon: "error",
  //               title: "Oops...",
  //               text: err,
  //             });
  //           });
  //       }
  //     });
  //   }

  let show = () => {
    menuRef.current.classList.toggle(`show_all_invitors_icon`);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className={"big_container"}>
            {file ? (
              <div
                className={`${styles.alert}`}
                style={{ scale: `${file ? 1 : 0}` }}
              >
                <img src={info_icon} alt="sorry" />
                <h2>هل انت متأكد</h2>

                <div>
                  <button
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => {
                      setLoader(true);
                      if (!file) {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: "there is no files",
                        });
                        return;
                      }
                      const fd = new FormData();
                      fd.append("file", file);
                      fd.append("Party_id", partyID);
                      fetch(
                        "https://www.izemak.com/azimak/public/api/addexcel",
                        {
                          method: "POST",
                          body: fd,
                        }
                      )
                        .then((res) => {
                          if (res.ok) {
                            // setLoader(false);
                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Your work has been saved",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            window.location.reload();
                            // setTimeout(() => {

                            //     window.location.reload();
                            // }, 1500);
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: err,
                          });
                        });
                    }}
                  >
                    إرسال
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className={`menu`} onClick={show}>
              <LuMenu />
            </div>
            <div className="main_form_container center">
              <form
                className="main_form center"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetch("https://www.izemak.com/azimak/public/api/addinvitor", {
                    method: "POST",
                    headers: { "Content-Type": "Application/json" },
                    body: JSON.stringify({
                      Party_id: partyID,
                      phoneNumber: phone,
                      name: name,
                      maxScan: maxScan,
                    }),
                  })
                    .then((response) => {
                      if (response.ok) {
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: `تم الإضافة للحفلة بنجاح`,
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        getData();
                        setName("");
                        setPhone("");
                        setMaxScan("");
                        return response.json();
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: response.msg,
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
                }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  إضافة مدعوين
                </motion.h2>
                <motion.div className={`input_container`}>
                  <motion.label
                    htmlFor="name"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {" "}
                    الإسم
                  </motion.label>
                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    type="text"
                    id="name"
                    placeholder="الإسم"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </motion.div>

                <motion.div className={`input_container`}>
                  <motion.label
                    htmlFor="phone"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {" "}
                    رقم الهاتف
                  </motion.label>
                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    type="number"
                    id="phone"
                    placeholder=" رقم الهاتف"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </motion.div>

                <motion.div className={`input_container`}>
                  <motion.label
                    htmlFor="scan"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    {" "}
                    عدد الدعوات{" "}
                  </motion.label>
                  <motion.input
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    type="number"
                    id="scan"
                    placeholder="عدد الدعوات"
                    value={maxScan}
                    onChange={(e) => {
                      setMaxScan(e.target.value);
                    }}
                  />
                </motion.div>

                <div className="buttons center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <label htmlFor="file" className="btn">
                      {" "}
                      رفع ملف
                    </label>
                    <motion.input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      placeholder=""
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </motion.div>

                  <div>
                    <motion.button
                      style={{ fontSize: "20px" }}
                      type="submit"
                      className="center btn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                    >
                      إضافة
                    </motion.button>
                  </div>
                </div>
              </form>
            </div>

            <aside className="aside center" ref={menuRef}>
              <MdClose className="aside_icon" onClick={show} />
              <div className={`header center`}>
                <Link to={`/all_invitors/${partyID}`}>قائمة المدعوين</Link>
              </div>
              <ul className="center">
                {data.map((i, index) => {
                  return (
                    <motion.li
                      key={i.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: "0." + index }}
                    >
                      <span> {index + 1}</span>
                      <span> {i.name}</span>
                      <span
                        className={`${
                          i.status === "rejected" ? "rejected" : ""
                        } ${i.status === "accepted" ? "accepted" : ""} ${
                          i.status === "invited" ? "invited" : ""
                        }`}
                      >
                        {i.status}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </>
      )}
    </>
  );
}
