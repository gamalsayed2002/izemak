import styles from "./add_party.module.css";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { IoMdCloudUpload } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "./imgs/izemak.jpeg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../COMPONENTS/LOADER/Loader";

export default function Add_Party() {
  const [loader, setLoader] = useState(false);
  let navigation = useNavigate();
  let [title, setTitle] = useState("");
  let [date, setDate] = useState(0);
  let [location, setLocation] = useState("");
  let [invitation, setInvitation] = useState(null);
  let [partyText, setPartyText] = useState("");
  let [partyLink, setPartyLink] = useState("");

  let [partyCondition, setPartyCondition] = useState("both");
  let [img, setImg] = useState(null);

  let submitF = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      setLoader(true);
      const fd = new FormData();
      fd.append("name", title);
      fd.append("time", date);
      fd.append("address", location);
      fd.append("invititon", invitation);
      fd.append("party_condition", partyCondition);
      fd.append("partyInvitationText", partyText);
      fetch("https://www.izemak.com/azimak/public/api/addparty", {
        method: "POST",
        body: fd,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((res) => {
          if (res.msg === "Created succeffuly") {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: ` تم إضافة الحفلة`,
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              navigation("/home");
            }, 1500);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to create party: " + res.msg,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
          setLoader(false);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must log in",
      });
      navigation("/");
    }
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
                إضافة حفل جديد
              </motion.h2>
              <motion.div
                className="input_container"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <select
                  id="partyCondition"
                  value={partyCondition}
                  onChange={(event) => {
                    setPartyCondition(event.target.value);
                    if (partyCondition === "qr") {
                      setImg(null);
                      setInvitation(null);
                    }
                  }}
                >
                  <option value="invitation">ارسال الدعوة فقط</option>
                  <option value="invitationWithQuestion">
                    إرسال الدعوة مع السؤال
                  </option>
                  <option value="both">
                    إرسال الدعوة و رمز الدخول مع السؤال
                  </option>
                  <option value="bothwithoutQuestion">
                    إرسال الدعوة مع رمز الدخول بدون السؤال
                  </option>
                  <option value="qr">إرسال رمز الدخول فقط</option>
                </select>
              </motion.div>

              <motion.div
                className={`input_container`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <label htmlFor="name"> إسم الحفل</label>
                <motion.input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  id="name"
                  placeholder=" إسم الحفل"
                />
              </motion.div>

              <motion.div
                className={`input_container`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <label htmlFor="date"> معاد الحفل</label>
                <motion.input
                  onChange={(e) => setDate(e.target.value)}
                  type="text"
                  id="date"
                  placeholder=" معاد الحفل"
                />
              </motion.div>

              <motion.div
                className={`input_container`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <label htmlFor="address"> مكان الحفل</label>
                <motion.input
                  onChange={(e) => setLocation(e.target.value)}
                  type="text"
                  id="address"
                  placeholder=" مكان الحفل"
                />
              </motion.div>

              <motion.div
                className={`input_container`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <label htmlFor="link"> رابط مكان الحفل</label>
                <motion.input
                  onChange={(e) => setPartyLink(e.target.value)}
                  type="text"
                  id="link"
                  placeholder=" رابط مكان الحفل"
                />
              </motion.div>

              <motion.div
                className={`input_container`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <label htmlFor="text"> ادخل نص الدعوة</label>
                <textarea
                  id="text"
                  onChange={(e) => setPartyText(e.target.value)}
                  placeholder="ادخل نص الدعوة"
                ></textarea>
              </motion.div>
              {partyCondition === "qr" ? (
                <></>
              ) : (
                <>
                  <motion.div
                    className={`input_container center`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  >
                    <label
                      htmlFor="img"
                      className="center"
                      style={{
                        height: img ? "auto" : "",
                        padding: img ? "10px" : "",
                        width: img ? "fit-content" : "",
                        borderRadius: img ? "5px" : "5px",
                      }}
                    >
                      {img !== null ? (
                        <>
                          <motion.img
                            src={img}
                            alt="img uploaded"
                            className="img"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.8 }}
                          />
                        </>
                      ) : (
                        <>
                          <IoMdCloudUpload className={`icon`} />
                          <span>upload</span>
                        </>
                      )}
                    </label>
                    <motion.input
                      type="file"
                      id="img"
                      placeholder=" "
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setInvitation(e.target.files[0]);
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImg(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </motion.div>
                </>
              )}

              <motion.button
                type="submit"
                className="center btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                إضافة الحفلة
              </motion.button>
            </form>
          </motion.div>
        </>
      )}
    </>
  );
}
