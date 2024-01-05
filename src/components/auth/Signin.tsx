import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import useApiSender from "@/setup/hooks/api/useApiSender";
import { loginAccount } from "@/webApi/loginAccount";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { ReloadIcon } from "@radix-ui/react-icons";
import { jwtDecode } from "jwt-decode";
import { DecodedJwtToken } from "@/utils/googlePayLoadProps";
import useAuth from "@/setup/hooks/auth/useAuth";
const Signin = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const { send, status, isLoading, data } = useApiSender(loginAccount, false);
  const validator =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  //login account
  const login = async () => {
    try {
      await send({
        email: email,
        password: password,
        oauth: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const googleLogin = async (googleAuthToken: CredentialResponse) => {
    const jwtToken = googleAuthToken.credential || "";
    try {
      const decoded = jwtDecode<DecodedJwtToken>(jwtToken);
      const accountData = {
        email: decoded?.email,
        password: "Google@123",
        token: jwtToken,
        oauth: true,
      };
      await send(accountData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (status == "success" && data) {
      const newAuth = {
        name: data.name,
        picture: data.picture,
        email: data.email,
        id: data.id,
        role: data.role,
        accessToken: data.accessToken,
      };
      setAuth({ ...newAuth });
      localStorage.setItem("auth", JSON.stringify(newAuth));
      const from = location.state?.from?.pathname || "/org";
      navigate(from, { replace: true });
    }
  }, [status]);

  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="font-bold text-2xl">Log In Your Certify Account</div>

        <div className="flex text-gray-600 mt-3">
          <div>New to Certify ?</div>
          <Link
            to={"/auth/register"}
            className="bg-green-500  rounded-lg px-2 text-white ml-2"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="h-full flex justify-center">
        <div className="w-full md:w-96 flex flex-col gap-3 px-6 md:px-0">
          <div className="w-full relative">
            <Input
              type="email"
              placeholder="Email"
              className="py-5"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <Input
            type="password"
            placeholder="Password"
            className="py-5"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <Button
            className="bg-green-500 hover:bg-green-600 py-5 w-full"
            disabled={!validator.test(email) || !password || isLoading}
            onClick={login}
          >
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Signing You In...
              </>
            ) : (
              "Login Account"
            )}
          </Button>

          <div className="w-full relative mt-6 mb-10">
            <hr />
            <div className="absolute w-12 bg-gray-200 text-gray-700 h-12 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 flex items-center justify-center rounded-full">
              OR
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="font-Nunito font-semibold my-2 text-gray-500">
              Login with your social profiles
            </div>

            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                toast.error("google");
              }}
              useOneTap
              width={"300px"}
              size="large"
              shape="square"
              text="continue_with"
              type="standard"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
