import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Webcam from "react-webcam";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [mode, setMode] = useState<"camera" | "upload">();
  const handleUpload = (e) => {
    console.log(e.target.files);
  }

  return (
    
    <div className="mobile-frame container content-center h-screen mx-auto p-4">
      <div className="grid grid-rows-2 text-center font-extrabold text-lg content-center gap-2">
      <h1>Show Your Support</h1>
      
      {!mode ? (
        <div className="flex gap-4 flex-col">
          <Button className="rounded-full size-40 m-auto" onClick={() => setMode('camera')}>
            Take Photo
          </Button>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e)}
            className="border-dashed border-gray-500 rounded-md"
          />
        </div>
      ) : (
        <Webcam capture={(img) => navigate('/crop')} />
      )}
      </div>
    </div>
  );
}

