import { useEffect, useRef, useState } from "react";
import styles from "./add_invitors.module.css";
import Loader from "../../COMPONENTS/LOADER/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { LuMenu } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import info_icon from "./imgs/info.512x512.png";
import users from "./imgs/userspng.png";
export default function Add_invitors() {
  const [loader, setLoader] = useState(true);
  const menuRef = useRef();
  let [data, setData] = useState([]);
  let [partyName, setPartyName] = useState();

  let { partyID } = useParams();
  let navigation = useNavigate();
  let [file, setFile] = useState(null);
  // let [send, setSend] = useState(false);
  // let [confirm, setConfirm] = useState(false);
  let [confirmNumbers, setConfirmNumbers] = useState(null);

  let [name, setName] = useState("");
  let [phone, setPhone] = useState("");
  let [maxScan, setMaxScan] = useState("");
  let [numberList, setNumberList] = useState([]);
  let [singleNumber, setSingleNumber] = useState(false);

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
        setPartyName(data.data.name);
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`${styles.alert} center`}
                style={{ scale: `${file ? 1 : 0}` }}
              >
                <motion.div
                  className={`${styles.container} center`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.img
                    src={info_icon}
                    alt="sorry"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    هل انت متأكد
                  </motion.h2>

                  <div>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 1 }}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      إلغاء
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 1 }}
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
                          "https://www.izemak.com/azimak/public/api/excel",
                          {
                            method: "POST",
                            body: fd,
                          }
                        )
                          .then((res) => {
                            if (!res.ok) {
                              throw new Error(
                                `Network response was not ok (status: ${res.status})`
                              );
                            }
                            return res.json();
                          })
                          .then((res) => {
                            if (res.msg === "success") {
                              setLoader(false);
                              setConfirmNumbers(res.data);
                              // setSend(false);
                              // setConfirm(true)
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
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              ""
            )}

            {confirmNumbers ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`${styles.alert} center`}
                style={{ scale: `${file ? 1 : 0}` }}
              >
                <motion.div
                  className={`${styles.container} center`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.img
                    src={users}
                    alt="sorry"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{height:"40px"}}
                  />
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    {`${confirmNumbers} عدد الاشخاص`}
                  </motion.h2>

                  <div>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 1 }}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      إلغاء
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 1 }}
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
                            if (!res.ok) {
                              throw new Error(
                                `Network response was not ok (status: ${res.status})`
                              );
                            }
                            return res.json();
                          })
                          .then((res) => {
                            if (res.msg === "choose") {
                              setLoader(false);
                              setNumberList(res.data);
                              setFile(null);
                              setConfirmNumbers(false);
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
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              ""
            )}

            {/* choose to confirm numbers */}

            {numberList.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`${styles.alert} center`}
                style={{ scale: `${numberList.length > 0 ? 1 : 0}` }}
              >
                <motion.div
                  className={`${styles.container} center`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.img
                    src={info_icon}
                    alt="sorry"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    هناك ارقام مكررة
                  </motion.h2>
                  <div className={`${styles.numberList_container} center`}>
                    <ul className="center">
                      {numberList.map((item) => {
                        return (
                          <li key={item.name} className="center">
                            <motion.span
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.8 }}
                              className="center"
                            >
                              {item.name}
                            </motion.span>
                            <motion.span
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.8 }}
                              className="center"
                            >
                              {item.phoneNumber}
                            </motion.span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className={`${styles.btns}`}>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 1 }}
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      إلغاء
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 1 }}
                      onClick={() => {
                        setLoader(true);
                        if (!numberList.length > 0) {
                          Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "there is no numbers",
                          });
                          return;
                        }
                        const fd = new FormData();
                        fd.append("data", JSON.stringify(numberList));

                        fetch(
                          "https://www.izemak.com/azimak/public/api/addexcel/confirm",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ data: numberList }),
                          }
                        )
                          .then((res) => {
                            if (!res.ok) {
                              throw new Error("Network response was not ok");
                            }
                            return res.json();
                          })
                          .then((res) => {
                            if (res.msg === "success") {
                              // setLoader(false);
                              // setFile(null);
                              // setNumberList([]);
                              Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500,
                              });

                              setTimeout(() => {
                                window.location.reload();
                              }, 1500);
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
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              ""
            )}
            {/* single duplicate number */}
            {singleNumber ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className={`${styles.alert} center`}
                style={{ scale: `${numberList.length > 0 ? 1 : 0}` }}
              >
                <motion.div
                  className={`${styles.container} center`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.img
                    src={info_icon}
                    alt="sorry"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    الرقم مكرر هل تريد إضافته
                  </motion.h2>
                  <div className={`${styles.btns}`}>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 1 }}
                      onClick={() => {
                        setSingleNumber(false);
                      }}
                    >
                      إلغاء
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: 1 }}
                      onClick={() => {
                        setLoader(true);
                        fetch(
                          "https://www.izemak.com/azimak/public/api/addinvitor/confirm",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              name: name,
                              phoneNumber: phone,
                              maxScan: maxScan,
                              Party_id: partyID,
                            }),
                          }
                        )
                          .then((res) => {
                            if (!res.ok) {
                              setLoader(false);
                              setSingleNumber(false);
                              throw new Error("Network response was not ok");
                            }
                            return res.json();
                          })
                          .then((res) => {
                            if (res.msg === "success") {
                              setLoader(false);
                              setSingleNumber(false);
                              Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500,
                              });

                              setTimeout(() => {
                                getData();
                                setName("");
                                setPhone("");
                                setMaxScan("");
                              }, 1500);
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
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
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
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      Party_id: partyID,
                      phoneNumber: phone,
                      name: name,
                      maxScan: maxScan,
                    }),
                  })
                    .then((res) => {
                      if (!res.ok) {
                        setLoader(false);
                        setSingleNumber(false);
                        throw new Error("Network response was not ok");
                      }
                      return res.json();
                    })
                    .then((response) => {
                      if (response.msg === "choose") {
                        setSingleNumber(true);
                        return;
                      } else if (response.msg === "success") {
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: `تم الإضافة للحفلة بنجاح`,
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        setTimeout(() => {
                          getData();
                          setName("");
                          setPhone("");
                          setMaxScan("");
                        }, 1500);
                      } else {
                        // Handle the error response
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: response.msg || "حدث خطأ غير متوقع", // Fallback message
                        });
                      }
                    })
                    .catch((error) => {
                      // Handle network errors
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.message || "حدث خطأ في الاتصال", // More user-friendly error message
                      });
                    });
                }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {partyName}
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
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        // setSend(true);
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
