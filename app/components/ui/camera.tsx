import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog";

// Type definitions
type WebcamProps = {
  onCapture: (imgSrc: string) => void;
  onError?: (error: Error) => void;
};

export default function WebcamCapture({ onCapture, onError }: WebcamProps) {
  const webcamRef = useRef<Webcam>(null);
  const [mirrored, setMirrored] = useState(true);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [isOpen, setIsOpen] = useState(true);
  console.log(onError)

  // Capture handler
  const capture = useCallback(() => {
    if (!webcamRef.current) return;
    
    const imageSrc = webcamRef.current.getScreenshot({
      width: 1080,
      height: 1920,
      // screenshotFormat: 'image/jpeg',
      // screenshotQuality: 0.8
    });
    
    if (imageSrc) {
      onCapture(imageSrc);
      setIsOpen(false);
    }
  }, [onCapture]);

  // Camera flip handler
  const flipCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  // Error handling
  // const handleError = (error: Error) => {
  //   console.error("Webcam Error:", error);
  //   onError?.(error);
  //   setIsOpen(false);
  // };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] h-[80vh]">
        <DialogHeader>Take a Selfie</DialogHeader>
        
        <div className="relative aspect-[9/16] mx-auto">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode,
              width: { ideal: 1080 },
              height: { ideal: 1920 }
            }}
            mirrored={mirrored}
            // onUserMediaError={handleError}
            className="rounded-lg h-full w-full object-cover"
          />

          {/* Camera Controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={flipCamera}
              aria-label="Flip camera"
            >
              <FlipHorizontalIcon className="h-4 w-4" />
            </Button>
            
            <Button
              variant="default"
              size="icon"
              onClick={capture}
              className="w-16 h-16 rounded-full"
              aria-label="Take photo"
            >
              <CameraIcon className="h-6 w-6" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMirrored(!mirrored)}
              aria-label="Toggle mirror"
            >
              <MirrorIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Icons (using lucide-react)
import { Camera, FlipHorizontal, MonitorSmartphone } from "lucide-react";

const CameraIcon = Camera;
const FlipHorizontalIcon = FlipHorizontal;
const MirrorIcon = MonitorSmartphone;