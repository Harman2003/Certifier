import React, { FC, useEffect, useState } from "react";
import XIcon from "@duyank/icons/regular/X";
import Eye from "@duyank/icons/regular/Eye";
import { useEditor, useSelectedLayers } from "@lidojs/editor";
import useParameters from "@/setup/hooks/utils/useTemplate";
import { ParamsInterface } from "@/setup/context/TemplateProvider";
interface setOverlayProps {
  fadeOverlay: string;
  setfadeOverlay: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

const TextContent: FC<setOverlayProps> = ({
  fadeOverlay,
  setfadeOverlay,
  onClose,
}) => {
  const parameterList = [
    "name",
    "userId",
    "grade",
    "creation",
    "expiration",
    "certificateId",
  ];
  const {parameters, setParameters} = useParameters();

  const { selectedLayerIds } = useSelectedLayers();
  const { actions, activePage } = useEditor((state) => ({
    activePage: state.activePage,
  }));

  useEffect(() => {
    if (fadeOverlay && selectedLayerIds[0]) {
      console.log("came2", fadeOverlay);
      console.log(selectedLayerIds);
      setParameters((prev) => {
        console.log('came')
        prev[fadeOverlay as keyof ParamsInterface] = selectedLayerIds[0];
        console.log(prev);
        return prev;
      });
      setfadeOverlay("");
    }
  }, [selectedLayerIds[0]]);

  const handleButtonClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    parameter: string
  ) => {
    if (parameters[parameter as keyof ParamsInterface]) return;
    actions.resetSelectLayer();
    setfadeOverlay(parameter);
    event.stopPropagation();
    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key == "Escape") {
          setfadeOverlay("");
        }
      },
      { once: true }
    );
  };

  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        flexDirection: "column",
        overflowY: "auto",
        display: "flex",
        backgroundColor: "hsla(0,0%,100%,.07)",
      }}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          height: 48,
          borderBottom: "1px solid hsla(0,0%,100%,.5)",
          padding: "0 20px",
        }}
      >
        <p
          css={{
            lineHeight: "48px",
            fontWeight: 600,
            color: "whitesmoke",
            flexGrow: 1,
          }}
        >
          Parameters
        </p>
        <div
          css={{
            fontSize: 20,
            flexShrink: 0,
            width: 32,
            height: 32,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onClose}
        >
          <XIcon />
        </div>
      </div>
      <div
        css={{
          flexDirection: "column",
          overflowY: "auto",
          display: "flex",
          margin: "6px",
        }}
      >
        <div css={{ margin: 4, color: fadeOverlay ? "#ff8282" : "gray" }}>
          {fadeOverlay
            ? `Click over a text block to pair with ${fadeOverlay}`
            : "Choose any number of parameters to dynamically link to your certificate template"}
        </div>

        {parameterList.map((parameter: string, index: number) => {
          let layerID = parameters[parameter as keyof ParamsInterface];
          return (
            <div
              key={index}
              onClick={(event) => handleButtonClick(event, parameter)}
              css={{
                cursor: "pointer",
                position: "relative",
                minHeight: "40px",
                border: "1px solid hsla(0,0%,100%,.07)",
                borderColor: (fadeOverlay == parameter && "#ff8282") || "",
                borderRadius: "4px",
                marginTop: "6px",
                padding: "5px",
                paddingLeft: "10px",
                marginBottom: "0px",
                display: "inline-block",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "",
                fontSize: "18px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "hsla(0,0%,100%,.07)",
                },
              }}
              className="group"
            >
              <div
                css={{
                  fontSize: layerID  && "13px",
                  display: "flex",
                  marginBottom: "3px",
                }}
              >
                <div css={{ color: layerID ? "whitesmoke" : "" }}>
                  {parameter}
                </div>
                {layerID && (
                  <div
                    css={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      marginRight: "6px",
                    }}
                  >
                    <Eye
                      color="lightgray"
                      css={{
                        marginRight: "4px",
                        fontSize: "16px",
                        "&:hover": {
                          color: "lightskyblue",
                        },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        actions.selectLayers(activePage, layerID);
                      }}
                    />
                    <XIcon
                      color="lightgray"
                      css={{
                        fontSize: "16px",
                        "&:hover": {
                          color: "lightskyblue",
                        },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        setParameters((prev) => {
                          prev[parameter as keyof ParamsInterface] = "";
                          return { ...prev };
                        });
                      }}
                    />
                  </div>
                )}
              </div>
              <div css={{ whiteSpace: "nowrap", color: "whitesmoke" }}>
                {parameters[parameter as keyof ParamsInterface]}
              </div>

              {layerID && (
                <div
                  css={{
                    position: "absolute",
                    bottom: 5,
                    right: 0,
                    width: 30,
                    height: 24,
                    // backgroundColor: "#444650",
                    // background:
                    // "linear-gradient(to right, transparent,#282929, #282929)",
                    borderRadius: "8px 0px 0px 8px",
                  }}
                  className="bg-gradient-to-r from-transparent via-[#282929] to-[#282929] group-hover:via-[#363636] group-hover:to-[#383838]"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TextContent;
