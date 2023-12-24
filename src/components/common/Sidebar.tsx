import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { logo } from "@/assets";
interface SidebarContentItem {
  name: string;
  path: string;
  icon: IconType;
}
const Sidebar = ({ content }: { content: SidebarContentItem[] }) => {
  const location = useLocation();
  const list = content.map((item) => {
    const newItem = { ...item, on: location.pathname == item.path };
    return newItem;
  });
  return (
    <div
      id="sidebar"
      className="relative bg-landing flex flex-col h-screen text-white shadow-sm font-NunitoSans"
    >
      <div className="p-4">
        <img src={logo} alt="certify" className="w-[184px]" />
        <div className="h-16 w-full bg-white/10 rounded-lg mt-4 flex-col justify-center items-center font-openSans hidden md:flex">
          <div className="text-white/80 text-md font- italic flex justify-center items-center w-full gap-2 font-Nunito">
            <div>Create</div>
            <div className="border-[1px] border-white/40 h-6"></div>
            <div>Save</div>
            <div className="border-[1px] border-white/40 h-6"></div>
            <div>Validate</div>
          </div>
        </div>
      </div>
      <hr className="border-white/30 my-4" />
      <div className="px-4">
        {list.map((item, i) =>
          row(i, item.name, item.path, item.icon, item.on)
        )}
      </div>
      <hr className="border-white/30 mb-12 mt-auto" />
    </div>
  );
};

function row(index:number, value:string, path:string, Icon:IconType, isTrue:boolean) {
  return (
    <Link
      key={index}
      to={path}
      className="relative group flex items-center justify-start h-12 hover:bg-white/5 rounded-lg px-2"
      style={{ backgroundColor: isTrue ? "rgb(255 255 255 / 0.1)" : "" }}>
      <Icon size={25} color="white"/>

      <div className="hidden md:block">
        <div className=" text-md ml-2">{value}</div>
      </div>

      {/* hover-title */}
      <div className="hidden md:opacity-0 transition-opacity duration-300 group-hover:block absolute z-20 top-5 left-14 md:left-2 p-1 rounded-lg whitespace-nowrap bg-gray-700 text-white">
        <div className="relative z-20">{value}</div>
        <div className="absolute top-2 -left-1 bg-gray-700 h-4 w-4  skew-x-12 -rotate-[38deg]"></div>
      </div>
    </Link>
  );
}

export default Sidebar;
