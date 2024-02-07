import { toPng } from "html-to-image";

export const thumbnail = async () => {
    const downloadRef = document.getElementsByClassName(
      "css-1frskk6-DesignPage"
    )[0] as HTMLElement;
  if (downloadRef) {
    const dataUrl = await toPng(downloadRef);
    // const img = document.createElement("a"); //Create <a>
    // img.href = dataUrl; //Image Base64 Goes here
    // img.download = "Image.png"; //File name Here
    // img.click();
    return dataUrl;
  }
};
