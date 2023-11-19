import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IconType } from "react-icons";
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
    <div className="flex flex-col h-screen text-white bg-gray-50 w-full shadow-sm font-NunitoSans">
      <div className="relative justify-end w-full h-full bg-blue-700">
        <div className="p-4">
          <div className="text-white text-4xl flex gap-3">
            <svg
              fill="none"
              // height="15%"
              viewBox="0 0 24 24"
              // width="15%"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[100%] w-[100%] md:h-[15%] md:w-[15%]"
            >
              <path
                opacity="0.16"
                d="M7.242 11.083c.449-1.674 2.17-3.394 3.843-3.843l10.434-2.796c1.673-.448 2.666.545 2.218 2.218L20.94 17.096c-.449 1.674-2.17 3.394-3.843 3.843L6.664 23.735c-1.673.448-2.666-.545-2.218-2.218l2.796-10.434Z"
                fill="#edb76f"
              ></path>
              <path
                d="M3.06 6.9c.448-1.674 2.168-3.394 3.842-3.843L17.336.261c1.673-.448 2.667.545 2.218 2.218l-2.796 10.434c-.449 1.674-2.169 3.394-3.843 3.843L2.481 19.552C.808 20-.185 19.007.263 17.334L3.06 6.9Z"
                fill="#edb76f"
              ></path>
            </svg>
            <div className="tracking-wider font-Poppins italic font-semibold">
              CERTIFY
            </div>
          </div>
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
        <div className="h-2/3  px-4">
          {list.map((item, i) =>
            row(i, item.name, item.path, item.icon, item.on)
          )}
        </div>
        <hr className="border-white/30 my-4" />
        <div></div>
      </div>
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
      <Icon size={25} />

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
