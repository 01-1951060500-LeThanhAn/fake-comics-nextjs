import React from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

import { useRouter } from "next/router";
import { googleSignIn } from "../config/firebase";

const SignUp: React.FC = () => {
  const router = useRouter();

  const handleLoginGoogle = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await googleSignIn();
      router.push("/");

      toast.success("Đăng nhập thành công");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex text-center h-screen justify-center mb-8 items-center">
      <button
        className="shadow-lg shadow-indigo-300/40 text-xl inline-flex items-center border-2 p-4"
        onClick={handleLoginGoogle}
      >
        <FcGoogle className="text-2xl" />{" "}
        <span className="ml-2">Đăng nhập với Google</span>
      </button>
    </div>
  );
};

export default SignUp;
