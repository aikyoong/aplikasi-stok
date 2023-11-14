import Logo from "./logo/tjp.png";
import {
  faXTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer className="text-sm py-4 bg-green_light ">
      <div className="max-w-5xl mx-auto space-y-3">
        <img src={Logo} alt="logo" className="max-w-[135px]" />
        <div className="w-1/3">
          <p className="font-semibold ">Address :</p>
          <p className="text-xs">
            Jl. Raya Pd. Gede No.48B, RT.3/RW.8, Lubang Buaya, Kec. Cipayung,
            Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13810
          </p>
        </div>
        <ul className="flex space-x-4">
          {/* <li>X</li> */}
          <div className="px-1 hover:bg-blue-100/10 rounded cursor-pointer">
            <FontAwesomeIcon icon={faXTwitter} />
          </div>
          <div className="px-1 hover:bg-blue-100/10 rounded cursor-pointer">
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div className="px-1 hover:bg-blue-100/10 rounded cursor-pointer">
            <FontAwesomeIcon icon={faFacebook} />
          </div>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
