import React, { useCallback, useEffect, useRef, useState } from "react";
import HeaderLayout from "./layout/HeaderLayout";
import Sidebar from "./layout/Sidebar";
import axios from "@/setup/api/axios";
import { isArray } from "lodash";
import AppLayerSettings from "./layout/AppLayerSettings";
import {
  DesignFrame,
  Editor,
  GetFontQuery,
  PageControl,
  Preview,
} from "@lidojs/editor";
import { FontData } from "@lidojs/core";
import { data } from "./utils/data";
import XIcon from "@duyank/icons/regular/X";
import BlurLoader from "@/components/utils/BlurLoader";

const Main = () => {
  const leftSidebarRef = useRef<HTMLDivElement>(null);
  const [openPreview, setOpenPreview] = useState(false);

  const getFonts = useCallback((query: GetFontQuery) => {
    const buildParams = (data: Record<string, string | string[]>) => {
      const params = new URLSearchParams();

      Object.entries(data).forEach(([key, value]) => {
        if (isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      });

      return params;
    };
    return axios
      .get<FontData[]>(`/template/fonts?${buildParams(query)}`)
      .then((res) => res.data);
  }, []);
  const [viewPortHeight, setViewPortHeight] = useState<number>();
  useEffect(() => {
    const windowHeight = () => {
      setViewPortHeight(window.innerHeight);
    };
    window.addEventListener("resize", windowHeight);
    windowHeight();
    return () => {
      window.removeEventListener("resize", windowHeight);
    };
  }, []);
  return (
    <Editor
      config={{
        assetPath: "./assets",
        frame: {
          defaultImage: {
            url: `./assets/images/frame-placeholder.png`,
            width: 1200,
            height: 800,
          },
        },
      }}
      getFonts={getFonts}
    >
      {/* Loader */}
      <BlurLoader/>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          maxHeight: viewPortHeight ? `${viewPortHeight}px` : "auto",
          fontFamily: "Nunito , sans-serif",
          color: "#5E6278",
          fontSize: "14px",
        }}
      >
        <HeaderLayout openPreview={() => setOpenPreview(true)} />
        {openPreview && (
          <div
            css={{
              position: "fixed",
              inset: 0,
              zIndex: 1040,
              background: "rgba(13,18,22,.95)",
            }}
          >
            <Preview />
            <div
              css={{
                background: "rgba(255,255,255,0.3)",
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                right: 24,
                top: 24,
                borderRadius: "50%",
                fontSize: 36,
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={() => setOpenPreview(false)}
            >
              <XIcon />
            </div>
          </div>
        )}
        <div
          css={{
            display: "flex",
            flexDirection: "row",
            flex: "auto",
            overflow: "auto",
            background: "#EBECF0",
            "@media (max-width: 900px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          <div
            ref={leftSidebarRef}
            css={{
              display: "flex",
            }}
          >
            <Sidebar />
          </div>
          <div
            css={{
              flexGrow: 1,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <AppLayerSettings />
            <div
              css={{
                flexGrow: 1,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                zIndex: 20,
              }}
            >
              <DesignFrame data={data} />
            </div>
            <div
              css={{
                height: 40,
                background: "#fff",
                borderTop: "1px solid rgba(57,76,96,.15)",
                display: "grid",
                alignItems: "center",
                flexShrink: 0,
                "@media (max-width: 900px)": {
                  display: "none",
                },
              }}
            >
              <PageControl />
            </div>
          </div>
        </div>
      </div>
    </Editor>
  );
};

export default Main;
