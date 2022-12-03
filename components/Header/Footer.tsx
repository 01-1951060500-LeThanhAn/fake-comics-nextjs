import { BsGithub, BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="">
        <div className="bg-gray-800 w-full  h-16 px-4 lg:px-10 pt-5">
          <div className="text-white text-md flex justify-between items-center ">
            <div className="name">
              <p className="pb-2">Lê Thành An 2022</p>
            </div>
            <div className="flex items-center pb-3">
              <div className="pr-4">Contact Me</div>
              <a
                href="https://github.com/01-1951060500-LeThanhAn"
                className="pr-4 cursor-pointer text-xl text-white "
              >
                <BsGithub />
              </a>
              <a
                href="https://www.facebook.com/Thanhan7112001"
                className=" text-white cursor-pointer text-xl"
              >
                <BsFacebook />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
