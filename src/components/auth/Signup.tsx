import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ReloadIcon, ReloadIcon as Rotate } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FcGoogle as GIcon } from "react-icons/fc";
import { BsMeta as MIcon } from "react-icons/bs";
import { BsGithub as GitIcon } from "react-icons/bs";
import OtpInput from "../utils/otpInput";
import { Button } from "../ui/button";
import useApiSender from "@/hooks/useApiSender";
import { sendOtp } from "@/webApi/sendOtp";
import { verifyOtp } from "@/webApi/verifyOtp";
import Resend from "../utils/resend";
import { registerAccount } from "@/webApi/registerAccount";
import useMultiRef from "@/hooks/useMultiRef";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/setup/hooks/useAuth";
const Signup = () => {
  const [role, setRole] = useState<string>("org");
  const [otpvalue, setOtpvalue] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [resendCounter, setresendCounter] = useState<number>(0);
  const fields = { name: 0, orgId: 1, pass: 2, confirmpass: 3 };
  const { ref: formRef, getRef } = useMultiRef(fields);
  const { send: send_otp, data } = useApiSender(sendOtp);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  const {
    send: verify_otp,
    status: isVerified,
    isLoading: isverifying,
  } = useApiSender(verifyOtp);
  const {
    send: createAccount,
    status: isRegistered,
    isLoading: isRegistering,
    data: registerData,
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
    try {
      if (data)
        verify_otp({
          email: email,
          otp: otpvalue,
          token: data.token,
        });
    } catch (err) {
      console.log(err);
    }
  };

  //create account
  const register = async () => {
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

    try {
      await createAccount({
        fullname: name?.value,
        email: email,
        password: pass?.value,
        role: role,
        orgid: orgid?.value,
        token: data?.token,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isRegistered == "success" && registerData) {
      const newAuth = {
        email: registerData.email,
        role: registerData.role,
        accessToken: registerData.accessToken,
      };
      setAuth({...newAuth});
      localStorage.setItem("auth", JSON.stringify(newAuth));
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isRegistered]);

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="font-bold text-2xl">Create A Certify Account</div>

        <div className="mt-2">
          <Select value={role} onValueChange={(value) => setRole(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="manager">Event Manager</SelectItem>
                <SelectItem value="org">Organisation</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex text-gray-600 mt-3">
          <div>Already have an Account ?</div>
          <Link
            to={"/auth/login"}
            className="bg-blue-800 rounded-lg px-2 text-white ml-2"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="h-full flex bg- justify-center gap-4">
        <div className="w-96">
          <div className="flex flex-col items-center ">
            <div className="font-semibold my-2 text-gray-600 m-3">
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
        <hr className="border-[1px] h-full" />
        <div className="w-96">
          <div className="font-semibold my-2 text-gray-600 m-3">
            Register with your email address
          </div>
          <Input
            type="text"
            placeholder="Full Name"
            className="py-5 m-3"
            ref={(el) => (formRef.current[0] = el)}
          />
          <div className="m-3 w-full relative">
            <Accordion
              type="single"
              collapsible={false}
              className="w-full"
              value={resendCounter == 0 ? "" : "item-1"}
            >
              <AccordionItem value="item-1" className="border-0">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="py-5"
                    value={email}
                    disabled={resendCounter != 0}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <AccordionTrigger
                    type="button"
                    className="absolute -right-16 top-1/2 -translate-y-1/2"
                    onClick={() => {
                      if (resendCounter == 0) callOtp();
                    }}
                    disabled={!validator.test(email)}
                    style={{
                      color: !validator.test(email) ? "lightgray" : "black",
                    }}
                  >
                    Verify
                  </AccordionTrigger>
                </div>

                <AccordionContent>
                  <div className="flex items-end mt-2">
                    <div className="ml-1 mr-4">
                      <div className="text-gray-600">One-Time-Password</div>
                      <OtpInput
                        value={otpvalue}
                        onChange={setOtpvalue}
                        valueLength={4}
                        className="border-[1px] w-10 h-10 text-center outline-none rounded-md text-lg"
                      />
                    </div>
                    <Button
                      className="bg-blue-800"
                      onClick={checkOtp}
                      disabled={
                        otpvalue?.length != 4 ||
                        !data ||
                        isVerified == "success" ||
                        isverifying
                      }
                    >
                      {isVerified == "success" ? (
                        "Verified"
                      ) : isverifying ? (
                        <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Verifying
                        </>
                      ) : (
                        "Verify"
                      )}
                    </Button>
                    {isVerified !== "success" && <Resend callOtp={callOtp} />}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {role == "org" && (
            <div className="flex items-center m-3 w-full relative">
              <Input
                type="text"
                placeholder="Organisation ID"
                className="py-5"
                disabled={isVerified != "success"}
                ref={(el) => (formRef.current[1] = el)}
              />
              <div className="p-2 absolute -right-8">
                <Rotate color="blue" />
              </div>
            </div>
          )}
          <Input
            type="password"
            placeholder="Password"
            className="py-5 m-3"
            disabled={isVerified != "success"}
            ref={(el) => (formRef.current[2] = el)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            className="py-5 m-3"
            disabled={isVerified != "success"}
            ref={(el) => (formRef.current[3] = el)}
          />
          <Button
            className="bg-blue-800 py-5 m-3 w-full"
            disabled={isVerified != "success" || isRegistering}
            onClick={register}
          >
            {isRegistering ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Signing You In...
              </>
            ) : (
              "Create New Account"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Signup;
