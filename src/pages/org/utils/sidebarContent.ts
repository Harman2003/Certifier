import { MdSpaceDashboard as Dash } from "react-icons/md";
import { SlCalender as EventIcon } from "react-icons/sl";
import { TbFileCertificate as CertIcon } from "react-icons/tb";
import { TbTemplate as TempIcon } from "react-icons/tb";
import { TbDatabaseExport as ExportIcon } from "react-icons/tb";
import { IoShieldCheckmarkOutline as ValidateIcon } from "react-icons/io5";


export const sidebarContent = [
  {
    name: "Dashboard",
    path: "/org",
    icon: Dash,
  },
  {
    name: "Events Record",
    path: "/org/events",
    icon: EventIcon,
  },
  {
    name: "Certificate Record",
    path: "/org/certificates",
    icon: CertIcon,
  },
  {
    name: "Template Manager",
    path: "/templates",
    icon: TempIcon,
  },
  {
    name: "Export Records",
    path: "/org/export",
    icon: ExportIcon,
  },
  {
    name: "Validate Certificate",
    path: "/",
    icon: ValidateIcon,
  },
];
