import { useEffect, useRef, useState } from "react";
import styles from "./all_invitors.module.css";
import html2pdf from "html2pdf.js";
import { motion } from "framer-motion";
import Loader from "../../COMPONENTS/LOADER/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IoSearch } from "react-icons/io5";
import {
  FaCheckSquare,
  FaEdit,
  FaFileExcel,
  FaFilePdf,
  FaPlus,
  FaUserEdit,
} from "react-icons/fa";
import { MdDelete, MdDeleteSweep } from "react-icons/md";
import logo from "./imgs/izemak.jpeg";

export default function All_invitors() {
  const [openStatusContainer, setOpenStatusContainer] = useState(false);
  let { partyID } = useParams();
  let [loader, setLoader] = useState(true);
  let [partyData, setPartyData] = useState([]);
  let [data, setData] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let [filter, setFilter] = useState("all");
  let [status, setStatus] = useState("status");
  let showPdf = false;
  const [ids, setIds] = useState([]);
  let naviation = useNavigate();

  // ref
  const pdfRef = useRef();
  const bigScreenRef = useRef();

  const getData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must log in",
      });
      naviation("/");
    }
    fetch(`https://www.izemak.com/azimak/public/api/inviters/${partyID}`)
      .then((res) => res.json())
      .then((res) => {
        setPartyData(res.data);
        setData(res.invitors);
        setLoader(false);

        return res.data;
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

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          {/* floating icons */}
          <div className="floating">
            {ids.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  onClick={(e) => {
                    setOpenStatusContainer(true);
                  }}
                  className={`floating_icon center`}
                >
                  <FaEdit className="icon" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`floating_icon center`}
                  onClick={() => {
                    Swal.fire({
                      title: `هل انت متأكد`,
                      showCancelButton: true,
                    }).then((data) => {
                      if (data.isConfirmed) {
                        fetch(
                          `https://www.izemak.com/azimak/public/api/invitors/delete`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              ids: ids,
                            }),
                          }
                        )
                          .then((res) => {
                            if (res.ok) {
                              return res.json();
                            } else {
                              return res.json().then((errorData) => {
                                throw new Error(
                                  errorData.msg || "Something went wrong"
                                );
                              });
                            }
                          })
                          .then((data) => {
                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: `تم الحذف بنجاح`,
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            // getPartyData();
                            window.location.reload();
                          })
                          .catch((error) => {
                            Swal.fire({
                              icon: "error",
                              title: "Oops...",
                              text:
                                error.message ||
                                "An unexpected error occurred.",
                            });
                          });
                      }
                    });
                  }}
                >
                  <MdDeleteSweep className="icon" />
                </motion.div>
              </>
            ) : (
              ""
            )}
            {/* excel  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.8 }}
              className={`floating_icon center`}
              onClick={() => {
                fetch(
                  `https://www.izemak.com/azimak/public/api/export/${partyID}`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                  .then((res) => {
                    if (res.ok) {
                      return res.blob();
                    } else {
                      throw new Error("Network response was not ok.");
                    }
                  })
                  .then((blob) => {
                    // Create a link element
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `party_${partyID}.xlsx`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                  })
                  .catch((error) => {
                    console.error("Error downloading the file:", error);
                    Swal.fire({
                      position: "top-end",
                      icon: "error",
                      title: `حدث خطأ`,
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  });
              }}
            >
              <FaFileExcel className="icon" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.6 }}
              className={`floating_icon center`}
              onClick={() => {
                // setShowPdf(!showPdf);
                showPdf = !showPdf;
                if (showPdf) {
                  const pdf = pdfRef.current;
                  bigScreenRef.current.classList.add(`show_table`);
                  pdf.classList.remove(`show_table`);
                  html2pdf(pdf, {
                    margin: [10, 0, 10, 0],
                  });
                } else {
                  const pdf = pdfRef.current;
                  bigScreenRef.current.classList.remove(`show_table`);
                  pdf.classList.add(`show_table`);
                }
              }}
            >
              <FaFilePdf className="icon" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              className={`floating_icon center`}
              onClick={() => {
                if (ids.length === data.length) {
                  setIds([]);
                  const checkboxes = document.querySelectorAll(".check_box");
                  checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                  });
                } else {
                  const checkboxes = document.querySelectorAll(".check_box");
                  checkboxes.forEach((checkbox) => {
                    checkbox.checked = true;
                  });
                  setIds(data.map((invitor) => invitor.id));
                }
              }}
            >
              <FaCheckSquare className="icon" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <Link
                to={`/add_invitors/${partyID}`}
                className={`floating_icon center`}
              >
                <FaPlus className={` icon`} />
              </Link>
            </motion.div>
          </div>

          {openStatusContainer ? (
            <div className={`${styles.edit_status_container}`}>
              <motion.div
                className={`${styles.edit_status}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`${styles.select_container}`}>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                  >
                    تغيير الحالة
                  </motion.h2>

                  <motion.select
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.6 }}
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <option value="invited"> Invited</option>
                    <option value="rejected"> Rejected</option>
                    <option value="accepted"> Accepted</option>

                    <option value="status"> status</option>
                  </motion.select>
                </div>
                <div className={`${styles.btn_container}`}>
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.9 }}
                    onClick={() => {
                      Swal.fire({
                        title: `هل انت متأكد`,
                        showCancelButton: true,
                      }).then((data) => {
                        if (data.isConfirmed) {
                          if (status === "status") {
                            setOpenStatusContainer(false);
                            const checkboxes =
                              document.querySelectorAll(".check_box");
                            checkboxes.forEach((checkbox) => {
                              checkbox.checked = false;
                            });
                            setIds([]);
                          } else {
                            fetch(
                              `https://www.izemak.com/azimak/public/api/invitors/status`,
                              {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                  ids: ids,
                                  status: status,
                                }),
                              }
                            )
                              .then((res) => {
                                if (res.ok) {
                                  return res.json();
                                } else {
                                  return res.json().then((errorData) => {
                                    throw new Error(
                                      errorData.msg || "Something went wrong"
                                    );
                                  });
                                }
                              })
                              .then((data) => {
                                Swal.fire({
                                  position: "top-end",
                                  icon: "success",
                                  title: `تم التعديل بنجاح`,
                                  showConfirmButton: false,
                                  timer: 1500,
                                });
                                setOpenStatusContainer(false);
                                const checkboxes =
                                  document.querySelectorAll(".check_box");
                                checkboxes.forEach((checkbox) => {
                                  checkbox.checked = false;
                                });
                                setIds([]);
                                setTimeout(() => {
                                  const checkboxes =
                                    document.querySelectorAll(".check_box");
                                  checkboxes.forEach((checkbox) => {
                                    checkbox.checked = false;
                                  });
                                  getData();
                                }, 1500);
                              })
                              .catch((error) => {
                                const checkboxes =
                                  document.querySelectorAll(".check_box");
                                checkboxes.forEach((checkbox) => {
                                  checkbox.checked = false;
                                });
                                getData();
                                Swal.fire({
                                  icon: "error",
                                  title: "Oops...",
                                  text:
                                    error.message ||
                                    "An unexpected error occurred.",
                                });
                              });
                          }
                        }
                      });
                    }}
                  >
                    تعديل
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 1 }}
                    onClick={(e) => {
                      setOpenStatusContainer(false);
                    }}
                  >
                    إلغاء
                  </motion.button>
                </div>
              </motion.div>
            </div>
          ) : (
            ""
          )}

          {/* change status */}
          <div className={`header_container`}>
            <Link to="/home" className={`img center`}>
              <img src={logo} alt="logo not found" />
            </Link>
            <div className={` search`}>
              <label className={`search_label`}>
                <input
                  type="text"
                  placeholder="ادخل اسم المدعو"
                  onChange={(e) => {
                    let value = e.target.value;
                    setSearchValue(e.target.value);
                    if (value === "") {
                      getData();
                    }
                  }}
                />
                <span>
                  <IoSearch />
                </span>
              </label>
              <button
                onClick={() => {
                  if (searchValue.length > 3) {
                    if (searchValue.length > 1) {
                      fetch(
                        `https://www.izemak.com/azimak/public/api/searchinvitor/${partyID}/${searchValue}`
                      )
                        .then((res) => res.json())
                        .then((res) => {
                          setData(res.data);
                        });
                    }
                  } else {
                    getData();
                  }
                }}
              >
                {" "}
                بحث
              </button>
            </div>

            <div className={`select_container`}>
              <select
                value={filter}
                onChange={(e) => {
                  setIds([]);
                  const checkboxes = document.querySelectorAll(".check_box");
                  checkboxes.forEach((checkbox) => {
                    checkbox.checked = false;
                  });
                  setFilter(e.target.value);

                  if (e.target.value === "all") {
                    setData(partyData);
                  } else if (e.target.value.includes("arrived")) {
                    let data = partyData.filter((i) => {
                      return i.status.includes("arrived");
                    });
                    setData(data);
                  } else {
                    setData(partyData);
                    let data = partyData.filter((i) => {
                      return i.status === e.target.value;
                    });
                    setData(data);
                  }
                }}
              >
                <option value="invited"> Invited</option>
                <option value="rejected"> Rejected</option>
                <option value="accepted"> Accepted</option>
                <option value="faild"> Faild</option>
                <option value="arrived"> Arrived</option>
                <option value="all"> All</option>
              </select>
            </div>
          </div>
          {/* big screen */}
          <div className="table_container" ref={bigScreenRef} id="big_screen">
            <table className={`table`}>
              <thead>
                <tr>
                  <th>إسم المدعو</th>
                  <th> رقم الهاتف</th>
                  <th> الحالة</th>
                  <th>#######</th>
                </tr>
              </thead>

              <tbody>
                {data.map((invitor) => {
                  return (
                    <tr key={invitor.id}>
                      <td> {invitor.name}</td>
                      <td>{invitor.phoneNumber} </td>
                      <td>
                        <p>{invitor.status}</p>
                      </td>
                      <td className={`icons_td`}>
                        <span>
                          <MdDelete
                            className={`icon`}
                            onClick={() => {
                              Swal.fire({
                                title: `هل انت متأكد انك ترغب في حذف  ${invitor.name}`,
                                showCancelButton: true,
                              }).then((data) => {
                                if (data.isConfirmed) {
                                  fetch(
                                    `https://www.izemak.com/azimak/public/api/deleteinvitor/${invitor.id}`,
                                    {
                                      method: "DELETE",
                                    }
                                  )
                                    .then((res) => {
                                      if (res.ok) {
                                        return res.json();
                                      }
                                    })
                                    .then((res) => {
                                      Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: `${invitor.name} تم حذف`,
                                        showConfirmButton: false,
                                        timer: 1500,
                                      });
                                      getData();
                                    })
                                    .catch((err) => console.log(err));
                                }
                              });
                            }}
                          />

                          <Link
                            to={`/edit_invitor/${invitor.id}`}
                            className={`addLink`}
                          >
                            <FaUserEdit className={`icon`} />
                          </Link>

                          <input
                            style={{ cursor: "pointer", padding: "50px" }}
                            className="check_box"
                            type="checkbox"
                            onChange={() => {
                              setIds((prevIds) => {
                                if (prevIds.includes(invitor.id)) {
                                  return prevIds.filter(
                                    (id) => id !== invitor.id
                                  );
                                } else {
                                  return [...prevIds, invitor.id];
                                }
                              });
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* pdf */}
          <div className="table_container show_table" ref={pdfRef} id="pdf">
            <table className={`table`}>
              <thead>
                <tr>
                  <th>إسم المدعو</th>
                  <th> رقم الهاتف</th>
                  <th> الحالة</th>
                </tr>
              </thead>

              <tbody>
                {data.map((invitor) => {
                  return (
                    <tr key={invitor.id}>
                      <td> {invitor.name}</td>
                      <td>{invitor.phoneNumber} </td>
                      <td>
                        <p>{invitor.status}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
