import Image from "next/image";
import logo from "../../../public/images/logos/logo1.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <nav className="relative">
        <Image src={logo} width={150} height={100} alt="logo" />
        <div className="flex justify-center items-center gap-6 absolute md:top-[1.5rem] md:right-[10rem]">
          <Link
            href={"/login"}
            className={`min-w-[120px] disabled:opacity-[.9] disabled:text-[rgb(34,34,34)] disabled:bg-[#e2e2e2] disabled:font-bold disabled:border-[#e2e2e2] disabled:cursor-not-allowed px-2 py-2.5 rounded-md text-[.95rem] bg-[#00628f] text-white cursor-pointer border-[1.5px] border-[#00628f] flex items-center justify-center gap-4 no-underline`}
          >
            Log In
          </Link>
          <Link
            href={"/register"}
            className={`min-w-[120px] disabled:opacity-[.9] disabled:cursor-not-allowed transition duration-300 px-2 py-2.5 rounded-md text-[.95rem] border-[#00628f] text-[#00628f] !cursor-pointer border-[1.5px] flex items-center justify-center gap-4 no-underline`}
          >
            Sign Up
          </Link>
        </div>
        <button
          className="nav-btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>
      <div
        className="offcanvas offcanvas-top"
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            <Image src={logo} width={200} height={150} alt="logo" />
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul>
            <a href="index.html">
              <li>Home</li>
            </a>
            <a href="service.html">
              <li>Our Service</li>
            </a>
            <a href="about.html">
              <li>About</li>
            </a>
            <a href="#faq">
              <li>FAQ</li>
            </a>
            <a href="blog.html">
              <li>Blog</li>
            </a>
            <a href="review.html">
              <li>Review</li>
            </a>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
