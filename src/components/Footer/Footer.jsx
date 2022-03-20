// Day JS
import dayjs from "dayjs";
// CSS
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <p>&copy;Jessica ELESSA - All rights reserved</p>
      <p>{dayjs().format("YYYY-MM-DD")}</p>
    </footer>
  );
}
