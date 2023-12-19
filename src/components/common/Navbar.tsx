import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
import useAuth from "@/setup/hooks/auth/useAuth";
import { Link, useLocation } from "react-router-dom";
import { stringToBytes32 } from "@/utils/stringToBytes32";

const Navbar = () => {
  const [popup, setpopup] = useState<boolean>(false);
  const {auth}= useAuth()
  const location = useLocation();
  const path = location.pathname
    .split("/")
    .map((s) => capitalize(s))
    .slice(2);
  
  
  // async function registerContract() {
  //   const name = auth.name;
  //   const email = auth.email;
  //   const id = stringToBytes32(auth.id);
  //   // console.log(factoryContract)
  //   // factoryContract?.methods.register(name, email, id)
  //   //   .send({ from: address })
  //   //   .on("transactionHash", function (hash) {
  //   //     console.log("Transaction Hash:", hash);
  //   //   })
  //   //   .on("receipt", function (receipt) {
  //   //     console.log("Transaction Receipt:", receipt);
  //   //   })
  //   //   .on("error", function (error) {
  //   //     console.error("Error:", error);
  //   //   });


  //   try {
  //     const res = await factoryContract?.methods
  //       .register(name, email, id)
  //       .send({from: address});
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <nav className="w-full h-full flex items-center px-10 gap-3 font-Poppins">
      <div className="flex items-center gap-2">
        <Link to={"/org"}>
          <div className="text-lg">Dashboard</div>
        </Link>
        {path.map((value) => (
          <div key={value} className="flex gap-2 items-center">
            <SlArrowRight size={15} />
            <div className="text-lg">{value}</div>
          </div>
        ))}
      </div>
      {/* <WalletButton/> */}
      <div className="ml-auto">
        <DropdownMenu onOpenChange={(open) => setpopup(open)}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3">
              <Avatar className="ml-auto">
                <AvatarImage src={auth.picture} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex gap-1 items-center cursor-pointer">
                <div className="font-semibold">{auth.name}</div>
                {popup ? (
                  <MdKeyboardArrowUp size={18} />
                ) : (
                  <MdKeyboardArrowDown size={18} />
                )}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 relative top-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

function capitalize(str: string) {
  return str.replace(/^\w/, (c: string) => c.toUpperCase());
}

export default Navbar;
