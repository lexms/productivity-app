"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Heart,
  Loader2,
  RefreshCw,
  Smartphone,
  Watch,
  Wifi,
} from "lucide-react";
import { useState } from "react";

interface Device {
  id: string | null;
  name: string;
  permissions: {
    sleep: boolean;
    heartRate: boolean;
    activity: boolean;
    stress: boolean;
    location: boolean;
  };
  connected: boolean;
  lastSync: string;
}

interface WearableConnectProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (device: Device) => void;
}

export function WearableConnect({
  open,
  onOpenChange,
  onConnect,
}: WearableConnectProps) {
  const [step, setStep] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [dataPermissions, setDataPermissions] = useState({
    sleep: true,
    heartRate: true,
    activity: true,
    stress: true,
    location: false,
  });

  const availableDevices = [
    { id: "apple-watch", name: "Apple Watch", type: "smartwatch", icon: Watch },
    { id: "fitbit", name: "Fitbit", type: "fitness-tracker", icon: Activity },
    { id: "oura", name: "Oura Ring", type: "ring", icon: Heart },
    { id: "garmin", name: "Garmin", type: "sports-watch", icon: Watch },
    { id: "whoop", name: "Whoop", type: "band", icon: Heart },
    {
      id: "samsung",
      name: "Samsung Galaxy Watch",
      type: "smartwatch",
      icon: Watch,
    },
    { id: "google", name: "Google Fit", type: "app", icon: Smartphone },
    { id: "withings", name: "Withings", type: "health-device", icon: Heart },
  ];

  const discoveredDevices = [
    {
      id: "apple-watch-series7",
      name: "Apple Watch Series 7",
      batteryLevel: 78,
      signalStrength: 92,
    },
    {
      id: "oura-gen3",
      name: "Oura Ring Gen 3",
      batteryLevel: 45,
      signalStrength: 85,
    },
  ];

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setStep(2);
    }, 2000);
  };

  const handleConnect = () => {
    if (!selectedDevice) return;

    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setConnectionSuccess(true);
      // Move to permissions step after showing success
      setTimeout(() => {
        setStep(3);
      }, 1000);
    }, 2000);
  };

  const handleFinish = () => {
    // Create a mock connected device object
    const connectedDevice = {
      id: selectedDevice,
      name:
        discoveredDevices.find((d) => d.id === selectedDevice)?.name ||
        "Unknown Device",
      permissions: dataPermissions,
      connected: true,
      lastSync: new Date().toISOString(),
    };

    onConnect(connectedDevice);
    onOpenChange(false);
    // Reset state for next time
    setStep(1);
    setSelectedDevice(null);
    setConnectionSuccess(false);
  };

  const getSignalStrengthColor = (strength: number) => {
    if (strength >= 80) return "bg-green-500";
    if (strength >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect Wearable Device</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Select your device type and start scanning"
              : step === 2
                ? "Select a device to connect"
                : "Configure data access permissions"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableDevices.map((device) => (
                <Button
                  key={device.id}
                  variant={selectedDevice === device.id ? "default" : "outline"}
                  className="h-auto py-4 px-2 flex flex-col items-center gap-2"
                  onClick={() => setSelectedDevice(device.id)}
                >
                  <device.icon className="w-8 h-8" />
                  <span className="text-xs text-center">{device.name}</span>
                </Button>
              ))}
            </div>

            <div className="pt-4">
              <Button
                onClick={handleStartScan}
                disabled={!selectedDevice || isScanning}
                className="w-full"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Wifi className="w-4 h-4 mr-2" />
                    Start Scanning
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Available Devices</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStartScan}
                disabled={isScanning}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-1 ${isScanning ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>

            <div className="space-y-3">
              {discoveredDevices.map((device) => (
                <button
                  key={device.id}
                  type="button"
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedDevice === device.id
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                  onClick={() => setSelectedDevice(device.id)}
                  aria-label={`Select ${device.name} device with ${device.signalStrength}% signal and ${device.batteryLevel}% battery`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Watch className="w-6 h-6 text-slate-700" />
                      <div>
                        <p className="font-medium">{device.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${getSignalStrengthColor(device.signalStrength)}`}
                            />
                            <span className="text-xs text-slate-500">
                              {device.signalStrength}%
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">•</span>
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                device.batteryLevel > 20
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span className="text-xs text-slate-500">
                              {device.batteryLevel}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                      {selectedDevice === device.id && (
                        <div className="h-3 w-3 rounded-full bg-blue-600" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4">
              <Button
                onClick={handleConnect}
                disabled={!selectedDevice || isConnecting || connectionSuccess}
                className="w-full"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : connectionSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Connected Successfully
                  </>
                ) : (
                  "Connect"
                )}
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">
                Data Access Permissions
              </h3>
              <p className="text-xs text-blue-800 mb-4">
                Select which data you want to share with the productivity app.
                This helps provide personalized insights based on your
                biometrics.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-600" />
                    <Label htmlFor="sleep" className="text-sm">
                      Sleep Data
                    </Label>
                  </div>
                  <Switch
                    id="sleep"
                    checked={dataPermissions.sleep}
                    onCheckedChange={(checked) =>
                      setDataPermissions({ ...dataPermissions, sleep: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-600" />
                    <Label htmlFor="heartRate" className="text-sm">
                      Heart Rate & HRV
                    </Label>
                  </div>
                  <Switch
                    id="heartRate"
                    checked={dataPermissions.heartRate}
                    onCheckedChange={(checked) =>
                      setDataPermissions({
                        ...dataPermissions,
                        heartRate: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Watch className="w-4 h-4 text-blue-600" />
                    <Label htmlFor="activity" className="text-sm">
                      Activity & Exercise
                    </Label>
                  </div>
                  <Switch
                    id="activity"
                    checked={dataPermissions.activity}
                    onCheckedChange={(checked) =>
                      setDataPermissions({
                        ...dataPermissions,
                        activity: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                    <Label htmlFor="stress" className="text-sm">
                      Stress & Recovery
                    </Label>
                  </div>
                  <Switch
                    id="stress"
                    checked={dataPermissions.stress}
                    onCheckedChange={(checked) =>
                      setDataPermissions({
                        ...dataPermissions,
                        stress: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <Label htmlFor="location" className="text-sm">
                      Location Data
                    </Label>
                  </div>
                  <Switch
                    id="location"
                    checked={dataPermissions.location}
                    onCheckedChange={(checked) =>
                      setDataPermissions({
                        ...dataPermissions,
                        location: checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> You can change these permissions at any
                time in the settings. Your data is encrypted and never shared
                with third parties.
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="mr-auto"
            >
              Back
            </Button>
          )}
          {step === 3 && (
            <Button onClick={handleFinish}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Finish Setup
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
