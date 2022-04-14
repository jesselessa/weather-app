// Day JS
import dayjs from "dayjs";
// CSS
// import "./Footer.css";

export default function Footer() {
  return (
    <footer className="text-center text-white bg-gray-800">
      <p>&copy; Jessica ELESSA - All rights reserved</p>
      <p>{dayjs().format("YYYY-MM-DD")}</p>
    </footer>
  );
}
