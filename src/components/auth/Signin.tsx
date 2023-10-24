import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FcGoogle as GIcon } from "react-icons/fc";
import { BsMeta as MIcon } from "react-icons/bs";
import { BsGithub as GitIcon } from "react-icons/bs";
import useApiSender from "@/hooks/useApiSender";
import { sendOtp } from "@/webApi/sendOtp";
import { verifyOtp } from "@/webApi/verifyOtp";
import Resend from "../utils/resend";
import { registerAccount } from "@/webApi/registerAccount";
import useMultiRef from "@/hooks/useMultiRef";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Signin = () => {
  const [role, setRole] = useState<string>("org");
  const [otpvalue, setOtpvalue] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [resendCounter, setresendCounter] = useState<number>(0);
  const fields = { name: 0, orgId: 1, pass: 2, confirmpass: 3 };
  const { ref: formRef, getRef } = useMultiRef(fields);
  const { send: send_otp, data } = useApiSender(sendOtp);
  const {
    send: verify_otp,
    status: isVerified,
    isLoading: isverifying,
  } = useApiSender(verifyOtp);
  const {
    send: createAccount,
    status: isRegistered,
    isLoading: isRegistering,
  } = useApiSender(registerAccount);
  const validator =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  //send otp
  const callOtp = async () => {
    setresendCounter((prev) => prev + 1);
    try {
      await send_otp(email);
    } catch {
      setresendCounter(0);
    }
  };
  //verifyotp
  const checkOtp = async () => {
    if (data)
      verify_otp({
        email: email,
        otp: otpvalue,
        token: data.token,
      });
  };

  //create account
  const register = () => {
    const [name, orgid, pass, confirmpass] = getRef([
      "name",
      "orgId",
      "pass",
      "confirmpass",
    ]);
    if (
      !name?.value ||
      !pass?.value ||
      !confirmpass?.value ||
      (role === "org" && !orgid?.value)
    ) {
      toast.error("Incomplete Information");
      return;
    } else if (pass?.value !== confirmpass?.value) {
      confirmpass.value = "";
      toast.error("Password doesn't match");
      return;
    }
    console.log(nameRef?.value);
  };

  // useEffect(() => {
  //   if (isError && !data) {
  //     console.log("came");
  //     setresendCounter(0);
  //   }
  // }, [isError]);

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="font-bold text-2xl">Log In Your Certify Account</div>

        <div className="flex text-gray-600 mt-3">
          <div>New to Certify ?</div>
          <Link to={"/auth/register"} className="bg-blue-800 rounded-lg px-2 text-white ml-2">
            Register
          </Link>
        </div>
      </div>

      <div className="h-full flex justify-center">
        <div className="w-96">
          <div className="m-3 w-full relative">
            <Input
              type="email"
              placeholder="Email"
              className="py-5"
              value={email}
              disabled={resendCounter != 0}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <Input
            type="password"
            placeholder="Password"
            className="py-5 m-3"
            ref={(el) => (formRef.current[2] = el)}
          />
          <Button className="bg-blue-800 py-5 m-3 w-full" onClick={register}>
            Login Account
          </Button>

          <div className="m-3 w-full relative mt-6 mb-10">
            <hr />
            <div className="absolute w-12 bg-gray-200 text-gray-700 h-12 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex items-center justify-center rounded-full">
              OR
            </div>
          </div>
          <div className="flex flex-col items-center ">
            <div className="font-semibold my-2 text-gray-600">Login with your social profiles</div>
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
