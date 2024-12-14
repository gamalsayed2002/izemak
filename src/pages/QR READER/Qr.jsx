import React, { useEffect, useState } from "react";
import { Html5QrcodeScanType, Html5QrcodeScanner } from "html5-qrcode";
import styles from "./qr.module.css";
import Swal from "sweetalert2";
export default function Qr() {
  const [scanResult, setScanResult] = useState(null);
  let [name, setName] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");
  let [scan, setScan] = useState("");
  let [maxScan, setMaxScan] = useState("");
  let [msg, setMsg] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    });

    scanner.render(success);

    function success(result) {
      // scanner.clear();
      fetch(`https://www.izemak.com/azimak/public/api/scan/${result}`)
        .then((res) => {
          if (!res.ok) {
            // Handle errors here
            return Promise.reject("Network response was not ok"); // Reject the promise with an error message
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
    }
  }, []);

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
                window.location.reload();
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
