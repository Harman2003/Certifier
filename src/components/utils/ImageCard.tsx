import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { canvasPreview } from "@/utils/canvasPreview";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import centerAspectCrop from "@/utils/centerAspectCrop";
import useApiSender from "@/setup/hooks/api/useApiSender";
import { uploadImg } from "@/webApi/uploadImg";
import { RxCross1 as Cross } from "react-icons/rx";
import UploadIcon from "@/assets/uploadImg.svg?react";
import ImgLoader from "./ImgLoader";
interface ImageCardProps{
  isImage: string,
  setIsImage:(value:string)=>void
}
export default function ImageCard({isImage, setIsImage}:ImageCardProps) {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDialog, setDialog] = useState<boolean>(false);
  const [drag, setDrag] = useState<boolean>(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const { send, data } = useApiSender(uploadImg, true);

  useEffect(() => {
    if (data) {
      setIsImage(data.key);
    }
  }, [data]);
  console.log(isImage);
  return (
    <div className="w-full h-[200px] flex items-center justify-center bg-gray-100 rounded-2xl">
      {!isImage && (
        <Dialog
          open={isDialog}
          onOpenChange={(value) => {
            setDialog(value);
            if (inputRef.current) inputRef.current.value = "";
          }}
        >
          <div
            className="flex flex-col justify-center items-center w-full h-full border-dashed rounded-2xl cursor-pointer"
            style={{
              border: drag ? "dashed rgb(156,163,175) 2px" : "",
              background: drag ? "rgb(229 231 235)" : "",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <UploadIcon />
            <div className="text-xl font-bold font-Nunito text-gray-400">
              Drag or Browse Image
            </div>
            <div className="text-sm font-semibold font-Nunito text-gray-400">
              SVG, PNG, JPG
            </div>
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              className="fileUpload"
              onChange={handleClick}
            />
          </div>
          <DialogContent className="flex flex-col max-w-[90%] md:max-w-fit">
            <DialogHeader>
              <DialogTitle>Crop Image</DialogTitle>
              <DialogDescription className="md:max-w-[600px] max-w-[300px]">
                Crop your event image while maintaining the required aspect
                ratio.
              </DialogDescription>
            </DialogHeader>
            <div className="md:max-w-[600px] max-h-[400px] max-w-[300px] overflow-y-auto overflow-x-hidden self-center uploadImg">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={16 / 9}
                minHeight={50}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={onDownloadCropClick}>
                Add Image
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <div
        style={{
          display: isImage ? "block" : "none",
          position: isImage ? "relative" : "fixed",
        }}
      >
        <div
          className="absolute z-10 -top-2 -left-2 w-4 h-4 p-1 bg-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => {
            setIsImage("");
            setCompletedCrop(undefined);
          }}
        >
          <Cross />
        </div>
        {!isImage || isImage === "pending" ? (
          <div className="bg-black/50 rounded-lg relative">
            <ImgLoader color="white"/>
            <canvas
              ref={previewCanvasRef}
              style={{
                objectFit: "contain",
                width: 300,
              }}
            />
          </div>
        ) : (
          <img
            src={`https://certify-events.s3.ap-south-1.amazonaws.com/${isImage}`}
            alt=""
            style={{
              objectFit: "contain",
              width: 300,
              borderRadius: "10px",
            }}
          />
        )}
      </div>
    </div>
  );

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(true);
  }

  function handleDragLeave() {
    setDrag(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onSelectFile(file);
    }
  }

  function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      onSelectFile(files[0]);
    }
  }

  function onSelectFile(file: File) {
    if (file) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
        setDialog(true);
      });
      reader.readAsDataURL(file);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 16 / 9));
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }
    canvasPreview(image, previewCanvas, completedCrop);
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    const blob = await offscreen.convertToBlob({
      type: "image/jpeg",
    });

    const formData = new FormData();
    formData.append("image", blob, "eventImg");
    setIsImage("pending");
    setDialog(false);

    try {
      for (const value of formData.values()) {
        console.log(value);
      }
      await send({ form: formData });
    } catch (err) {
      console.log(err);
    }
  }
}
