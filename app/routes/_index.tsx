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
    <div className="mobile-frame">
      <h1>Show Your Support</h1>
      
      {!mode ? (
        <div className="flex gap-4">
          <Button onClick={() => setMode('camera')}>
            Take Photo
          </Button>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e)}
          />
        </div>
      ) : (
        <Webcam onCapture={(img) => navigate('/crop')} />
      )}
    </div>
  );
}

