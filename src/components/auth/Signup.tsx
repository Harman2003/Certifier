import { useEffect, useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
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
import LoginSvg from "@/assets/login.svg?react";
import OtpInput from "../utils/otpInput";
import { Button } from "../ui/button";
import useApiSender from "@/setup/hooks/api/useApiSender";
import { sendOtp } from "@/webApi/sendOtp";
import { verifyOtp } from "@/webApi/verifyOtp";
import { registerAccount } from "@/webApi/registerAccount";
import useMultiRef from "@/setup/hooks/utils/useMultiRef";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/setup/hooks/auth/useAuth";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { DecodedJwtToken } from "@/utils/googlePayLoadProps";
import Resend from "../utils/resend"

const Signup = () => {
  const [role, setRole] = useState<string>("none");
  const [otpvalue, setOtpvalue] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [resendCounter, setresendCounter] = useState<number>(0);
  const fields = { name: 0, pass: 1, confirmpass: 2 };
  const { ref: formRef, getRef } = useMultiRef(fields);
  const { send: send_otp, data } = useApiSender(sendOtp, false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();
  const {
    send: verify_otp,
    status: isVerified,
    isLoading: isverifying,
  } = useApiSender(verifyOtp, false);
  const {
    send: createAccount,
    status: isRegistered,
    isLoading: isRegistering,
    data: registerData,
  } = useApiSender(registerAccount, false);
  const validator =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  //send otp
  const callOtp = async () => {
    setresendCounter((prev) => prev + 1);
    try {
      await send_otp({email});
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
  const registerWithEmail = async () => {
    const [name, pass, confirmpass] = getRef(["name", "pass", "confirmpass"]);
    if (!name?.value || !pass?.value || !confirmpass?.value) {
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
        role: role == "none" ? "" : role,
        picture: "",
        token: data?.token,
        oauth: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const registerWithGoogle = async (googleAuthToken: CredentialResponse) => {
    const jwtToken = googleAuthToken.credential || "";
    try {
      const decoded = jwtDecode<DecodedJwtToken>(jwtToken);
      await createAccount({
        fullname: decoded?.name,
        email: decoded?.email,
        password: "Google@123",
        role: role == "none" ? "" : role,
        picture: decoded.picture,
        token: jwtToken,
        oauth: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isRegistered == "success" && registerData) {
      const newAuth = {
        name: registerData.name,
        picture: registerData.picture,
        email: registerData.email,
        id: registerData.id,
        role: registerData.role,
        accessToken: registerData.accessToken,
      };
      setAuth({ ...newAuth });
      localStorage.setItem("auth", JSON.stringify(newAuth));
      const from = location.state?.from?.pathname || "/org";
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

                <SelectItem value="none">Select Role</SelectItem>
                <SelectItem value="user" disabled>
                  User
                </SelectItem>
                <SelectItem value="manager" disabled>
                  Event Manager
                </SelectItem>
                <SelectItem value="org">Organisation</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex  items-center text-gray-600 mt-3 md:flex-row gap-2">
          <div>Already have an Account?</div>
          <Link
            to={"/auth/login"}
            className="bg-green-500 hover:bg-green-600 rounded-lg w-fit px-2 text-white"
          >
            Login
          </Link>
        </div>
      </div>

      <div className="h-full flex justify-center gap-4 mt-6 md:mt-0">
        <div className="flex-1 flex-col hidden md:flex items-end">
          <div className="font-Nunito font-semibold my-3 text-gray-600">
            Signup with your social profiles
          </div>
          <GoogleLogin
            onSuccess={registerWithGoogle}
            onError={() => {
              console.log("Google Auth Failed");
            }}
            useOneTap
            width={"300px"}
            size="large"
            shape="square"
            text="continue_with"
            type="standard"
          />

          <LoginSvg className="w-[360px]" />
        </div>
        <hr className="border-[1px] mx-3 h-full hidden md:block" />
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="font-Nunito font-semibold my-3 text-gray-600 hidden md:block">
            Register with your email address
          </div>
          <div className="w-full px-6 md:px-0 md:w-96 flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Full Name"
              className="py-5"
              ref={(el) => (formRef.current[0] = el)}
            />
            <div className="w-full relative">
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
                      className="py-5 pr-16"
                      value={email}
                      disabled={resendCounter != 0}
                      onChange={(e) => setemail(e.target.value)}
                    />
                    {resendCounter == 0 ? (
                      <AccordionTrigger
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={callOtp}
                        disabled={!validator.test(email)}
                        style={{
                          color: !validator.test(email) ? "lightgray" : "black",
                        }}
                      >
                        Verify
                      </AccordionTrigger>
                    ) : (
                      isVerified != "success" && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <Resend callOtp={callOtp} />
                        </div>
                      )
                    )}
                  </div>

                  <AccordionContent>
                    <div className="w-full flex items-end mt-2 overflow-hidden">
                      <div className="ml-1 mr-4">
                        <div className="text-gray-400">One-Time-Password</div>
                        <OtpInput
                          value={otpvalue}
                          onChange={setOtpvalue}
                          valueLength={4}
                          className="border-[1px] w-10 h-10 text-center outline-none rounded-md text-lg"
                        />
                      </div>
                      <Button
                        className="bg-green-500 hover:bg-green-600"
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
                      {/* {isVerified !== "success" && <Resend callOtp={callOtp} />} */}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Input
              type="password"
              placeholder="Password"
              className="py-5"
              disabled={isVerified != "success"}
              ref={(el) => (formRef.current[1] = el)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="py-5"
              disabled={isVerified != "success"}
              ref={(el) => (formRef.current[2] = el)}
            />
            <Button
              className="bg-green-500 hover:bg-green-600 py-5 w-full"
              disabled={
                isVerified != "success" || isRegistering || role == "none"
              }
              onClick={registerWithEmail}
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
            <div className="md:hidden w-full flex justify-center">
              <GoogleLogin
                onSuccess={registerWithGoogle}
                onError={() => {
                  console.log("Google Auth Failed");
                }}
                useOneTap
                width={"310px"}
                size="large"
                shape="square"
                text="continue_with"
                type="standard"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
