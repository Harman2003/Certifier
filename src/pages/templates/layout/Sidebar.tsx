import React, { useState } from "react";
import SidebarTab from "./tabs/TabList";
import LayoutIcon from "@duyank/icons/regular/Layout";
import TextTIcon from "@duyank/icons/regular/TextT";
import SquareIcon from "@duyank/icons/regular/Square";
import TextContent from "./sidebarContent/TextContent";
import ShapeContent from "./sidebarContent/ShapeContent";
import UploadIcon from "@duyank/icons/regular/Upload";
import UploadContent from "./sidebarContent/UploadContent";
import TemplateContent from "./sidebarContent/TemplateContent";
import ParameterContent from "./sidebarContent/ParameterContent";
import ParameterIcon from "@duyank/icons/regular/PushPin";
import { IoExitOutline as ExitIcon } from "react-icons/io5";
import { useEditor } from "@lidojs/editor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  {
    name: "Template",
    icon: <LayoutIcon />,
  },
  {
    name: "Text",
    icon: <TextTIcon />,
  },
  {
    name: "Shape",
    icon: <SquareIcon />,
  },
  {
    name: "Upload",
    icon: <UploadIcon />,
  },
  {
    name: "Parameter",
    icon: <ParameterIcon />,
  },
];
const Sidebar = () => {
  const navigate = useNavigate();
  const { actions } = useEditor();
  const [tab, setTab] = useState<string | null>(null);
  const [fadeOverlay, setfadeOverlay] = useState<string>("");

  return (
    <>
      <div
        css={{
          display: "flex",
          zIndex: fadeOverlay ? 5 : 50,
          position: "relative",
          backgroundColor: "#18191b",
          borderRight: "1px solid rgba(217, 219, 228, 0.6)",
        }}
      >
        <div
          css={{
            display: "flex",
          }}
        >
          <SidebarTab
            tabs={tabs}
            active={tab}
            onChange={(_, tab) => {
              actions.setSidebar();
              setTab(tab);
            }}
          />
          {tab && (
            <div
              css={{
                width: 360,
                "@media (max-width: 900px)": {
                  width: "100%",
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  top: 0,
                  background: "#fff",
                },
              }}
            >
              {tab === "Template" && (
                <TemplateContent
                  onClose={() => {
                    setTab(null);
                    actions.setSidebar();
                  }}
                />
              )}
              {tab === "Text" && (
                <TextContent
                  onClose={() => {
                    setTab(null);
                    actions.setSidebar();
                  }}
                />
              )}
              {tab === "Shape" && (
                <ShapeContent
                  onClose={() => {
                    setTab(null);
                    actions.setSidebar();
                  }}
                />
              )}
              <UploadContent
                visibility={tab === "Upload"}
                onClose={() => {
                  setTab(null);
                  actions.setSidebar();
                }}
              />
              {tab === "Parameter" && (
                <ParameterContent
                  fadeOverlay={fadeOverlay}
                  setfadeOverlay={setfadeOverlay}
                  onClose={() => {
                    setTab(null);
                    actions.setSidebar();
                  }}
                />
              )}
            </div>
          )}
        </div>
        <div
          css={{
            width: 360,
            position: "absolute",
            overflow: "hidden",
            top: 0,
            left: 73,
            height: "100%",
            pointerEvents: "none",
          }}
          id={"settings"}
        />

        <AlertDialog>
          <AlertDialogTrigger>
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "fixed",
                bottom: 25,
                left: 20,
                color: "hsla(0,0%,100%,.5)",
              }}
            >
              <ExitIcon size={24} />
              <div>Exit</div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to exit the template page?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Before exiting, please remember to save the certificate template
                you have just created to your collection.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* faded overlay on Parameter selection */}
      {fadeOverlay && (
        <div
          css={{
            backgroundColor: "black",
            opacity: 0.2,
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 10,
            cursor: "not-allowed",
          }}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
