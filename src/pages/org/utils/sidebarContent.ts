import { MdSpaceDashboard as Dash } from "react-icons/md";
import { SlCalender as EventIcon } from "react-icons/sl";
import { TbFileCertificate as CertIcon } from "react-icons/tb";
import { TbTemplate as TempIcon } from "react-icons/tb";
import { TbDatabaseExport as ExportIcon } from "react-icons/tb";

export const sidebarContent = [
  {
    name: "Dashboard",
    path: "/org",
    icon: Dash,
  },
  {
    name: "Events",
    path: "/org/events",
    icon: EventIcon,
  },
  {
    name: "Certifications",
    path: "/org/certificates",
    icon: CertIcon,
  },
  {
    name: "Access Requests",
    path: "/org/requests",
    icon: TempIcon,
  },
  {
    name: "Templates",
    path: "/templates",
    icon: TempIcon,
  },
  {
    name: "Export Records",
    path: "/org/export",
    icon: ExportIcon,
  },
  // {
  //   name: "Event Managers",
  //   path: "/org/managers",
  //   icon: ExportIcon,
  // },
  // {
  //   name: "Validate",
  //   path: "/validate",
  //   icon: EventIcon,
  // },
];
