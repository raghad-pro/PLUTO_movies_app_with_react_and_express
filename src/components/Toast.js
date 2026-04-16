import "../App.css";
import { useEffect } from "react";

export default function Toast({ message, type = "success", onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`toast ${type}`}>
      <i
        className={`fas ${type === "success" ? "fa-circle-check" : type === "error" ? "fa-circle-xmark" : "fa-circle-info"}`}
        style={{ marginRight: 8 }}
      ></i>
      {message}
    </div>
  );
}
