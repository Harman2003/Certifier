import React, {
  ChangeEvent,
  forwardRef,
  ForwardRefRenderFunction,
  useRef,
} from "react";
import PlayCircleIcon from "@duyank/icons/regular/PlayCircle";
import { downloadObjectAsJson } from "../utils/download";
import { useEditor } from "@lidojs/editor";
import { toast } from "react-toastify";
import { toPng } from "html-to-image";
import { thumbnail } from "../utils/templateImg";
import useApiSender from "@/setup/hooks/api/useApiSender";
import { createTemplate } from "@/webApi/createTemplate";
import useParameters from "@/setup/hooks/utils/useTemplate";
interface HeaderLayoutProps {
  openPreview: () => void;
}
const HeaderLayout: ForwardRefRenderFunction<
  HTMLDivElement,
  HeaderLayoutProps
> = ({ openPreview }, ref) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const { actions, query } = useEditor();
  const { parameters } = useParameters();
  const {send, isLoading} = useApiSender(createTemplate, false);

  const handleExport = () => {
    downloadObjectAsJson("file", query.serialize());
  };
  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const fileContent = JSON.parse(reader.result as string);
        actions.setData(fileContent);
      };
      reader.readAsText(file);
      e.target.value = "";
    }
  };


  //error going on saveTemplate 
  const saveTemplate = async () => {
    try {  
      const data = query.serialize();
      const img = await thumbnail();
      const base64Response = await fetch(img || "");
      const blob = await base64Response.blob();
      const form = new FormData();
      form.append("data", JSON.stringify(data));
      form.append('img', blob, "thumbnail");
      form.append('parameters', JSON.stringify(parameters));
      send({form});
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      ref={ref}
      css={{
        background: "#18191b",
        padding: "12px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        "@media (max-width: 900px)": {
          padding: 12,
        },
      }}
    >
      <img src="/logo.svg" alt="certify" className="w-[164px]" />
      <div css={{ display: "flex", alignItems: "center" }}>
        <div
          css={{
            margin: "0 16px",
            cursor: "pointer",
            color: "#fff",
            fontWeight: 700,
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => uploadRef.current?.click()}
        >
          <input
            ref={uploadRef}
            type="file"
            accept="application/json"
            onChange={handleImport}
            css={{ display: "none" }}
          />
          Import
        </div>
        <div
          css={{
            margin: "0 16px",
            cursor: "pointer",
            color: "#fff",
            fontWeight: 700,
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => handleExport()}
        >
          Export
        </div>
        <div
          css={{
            margin: "0 16px",
            cursor: "pointer",
            color: "#fff",
            fontWeight: 700,
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={saveTemplate}
        >
          Save
        </div>
        <div
          css={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
            lineHeight: 1,
            margin: "0 16px",
            padding: "6px 12px",
            backgroundColor: "hsla(0,0%,100%,.1)",
            borderRadius: 8,
            cursor: "pointer",
            ":hover": {
              textDecoration: "underline",
            },
          }}
          onClick={openPreview}
        >
          <div css={{ marginRight: 4, fontSize: 20 }}>
            <PlayCircleIcon />
          </div>{" "}
          Preview
        </div>
      </div>
    </div>
  );
};

export default forwardRef(HeaderLayout);
