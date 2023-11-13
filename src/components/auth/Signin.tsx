import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FcGoogle as GIcon } from "react-icons/fc";
import { BsMeta as MIcon } from "react-icons/bs";
import { BsGithub as GitIcon } from "react-icons/bs";
import useApiSender from "@/hooks/useApiSender";
import { registerAccount } from "@/webApi/registerAccount";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Signin = () => {
  const {
    send: loginAccount,
    status: isLoginDone,
    isLoading,
  } = useApiSender(registerAccount);
  const validator =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  //login account
  const login = () => {};

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="font-bold text-2xl">Log In Your Certify Account</div>

        <div className="flex text-gray-600 mt-3">
          <div>New to Certify ?</div>
          <Link
            to={"/auth/register"}
            className="bg-blue-800 rounded-lg px-2 text-white ml-2"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="h-full flex justify-center">
        <div className="w-96">
          <div className="m-3 w-full relative">
            <Input type="email" placeholder="Email" className="py-5" />
          </div>
          <Input type="password" placeholder="Password" className="py-5 m-3" />
          <Button className="bg-blue-800 py-5 m-3 w-full" onClick={login}>
            Login Account
          </Button>

          <div className="m-3 w-full relative mt-6 mb-10">
            <hr />
            <div className="absolute w-12 bg-gray-200 text-gray-700 h-12 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex items-center justify-center rounded-full">
              OR
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <div className="font-semibold my-2 text-gray-600">
              Login with your social profiles
            </div>
            <div className=" w-full flex justify-center gap-3">
              <Button variant="outline" className=" w-16 h-16 flex flex-col">
                <GIcon size={40} />
                <div className="text-xs text-gray-600">Google</div>
              </Button>
              <Button variant="outline" className=" w-16 h-16 flex flex-col">
                <MIcon size={40} color="royalblue" />
                <div className="text-xs text-gray-600">Meta</div>
              </Button>
              <Button variant="outline" className=" w-16 h-16 flex flex-col">
                <GitIcon size={40} />
                <div className="text-xs text-gray-600">Github</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
