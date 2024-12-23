import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import styles from "./qr.module.css";
import Swal from "sweetalert2";
export default function Qr() {
  const [scanResult, setScanResult] = useState(null);
  let [name, setName] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [scan, setScan] = useState("");
  let [maxScan, setMaxScan] = useState("");
  let [msg, setMsg] = useState("");
  let [reader, setReader] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    const success = (result) => {
      scanner.clear();
      setReader(false);

      fetch(`https://www.izemak.com/azimak/public/api/scan/${result}`)
        .then((res) => {
          if (!res.ok) {
            return Promise.reject("Network response was not ok");
          }
          return res.json();
        })
        .then((res) => {
          setScanResult(true);
          setMsg(res.msg);
          setName(res.data.name);
          setPhoneNumber(res.data.phoneNumber);
          setMaxScan(res.data.maxScan);
          setScan(res.data.scan);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err,
          });
        });
    };

    if (reader) {
      scanner.render(success);
    } else {
      scanner.clear();
    }

    return () => {
      scanner.clear();
    };
  }, [reader]);

  return (
    <>
      <h2 style={{ width: "fit-content", margin: "20px auto" }}>
        Qr code reader
      </h2>

      <div
        id="reader"
        style={{ width: "500px", margin: "0 auto", maxWidth: "95%" }}
      ></div>
      <div className={`${styles.result} center`}>
        {scanResult ? (
          <>
            <h2>{msg}</h2>
            <ul className="center">
              <li className="center">
                <span>Name</span> <span>{name}</span>
              </li>
              <li className="center">
                <span>phone number</span> <span>{phoneNumber}</span>
              </li>
              <li className="center">
                <span>scan</span> <span>{scan}</span>
              </li>
              <li className="center">
                <span>max scan</span> <span>{maxScan}</span>
              </li>
            </ul>
            <button
              onClick={() => {
                // handleRescan();
                setReader(true);
              }}
            >
              Rescan
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
