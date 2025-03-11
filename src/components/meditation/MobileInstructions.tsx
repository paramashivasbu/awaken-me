import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Info, Download, Share2 } from "lucide-react";

interface MobileInstructionsProps {
  onClose: () => void;
}

const MobileInstructions = ({ onClose }: MobileInstructionsProps) => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Install on Your Device
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          You can install this app on your{" "}
          {isIOS
            ? "iPhone/iPad"
            : isAndroid
              ? "Android device"
              : "mobile device"}{" "}
          to use it like a native app.
        </p>

        {isIOS && (
          <div className="space-y-2">
            <h3 className="font-medium">For iOS:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Tap the Share button <Share2 className="inline h-4 w-4" /> at
                the bottom of the screen
              </li>
              <li>Scroll down and tap "Add to Home Screen"</li>
              <li>Tap "Add" in the top right corner</li>
            </ol>
          </div>
        )}

        {isAndroid && (
          <div className="space-y-2">
            <h3 className="font-medium">For Android:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Tap the menu button (three dots) in the top right</li>
              <li>Tap "Add to Home screen" or "Install app"</li>
              <li>Follow the on-screen instructions</li>
            </ol>
          </div>
        )}

        {!isIOS && !isAndroid && (
          <div className="space-y-2">
            <h3 className="font-medium">Installation Instructions:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                On iOS: Use Safari, tap Share{" "}
                <Share2 className="inline h-4 w-4" /> then "Add to Home Screen"
              </li>
              <li>
                On Android: Tap the menu button, then "Install app" or "Add to
                Home screen"
              </li>
            </ol>
          </div>
        )}

        <div className="pt-2">
          <p className="text-sm text-muted-foreground">
            Once installed, you'll be able to use all features including alarms
            that can wake you up with guided meditations.
          </p>
        </div>

        <Button onClick={onClose} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Got it
        </Button>
      </CardContent>
    </Card>
  );
};

export default MobileInstructions;
