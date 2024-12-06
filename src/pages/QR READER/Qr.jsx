import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import styles from "./qr.module.css";
export default function Qr() {
  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
     
    });

    scanner.render(success, Error);
    function success(result) {
      scanner.clear();
      setScanResult(result);
    }
    function err(error) {
      console.warn(error);
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

      <div className={styles.result}>{scanResult}</div>
    </>
  );
}
