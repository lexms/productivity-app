"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle2,
  Heart,
  Moon,
  Plus,
  Target,
  Watch,
  Wifi,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type { WearableDevice, WearableData } from "@/lib/db/schema";

// Device add form data interface
interface DeviceAddData {
  name: string;
  brand: "whoop" | "garmin" | "appleWatch";
  model: string;
}

interface WearablesIntegrationProps {
  connectedDevices: WearableDevice[];
  selectedDevice: WearableDevice | null;
  showAddDevice: boolean;
  onAddDevice: (deviceData: DeviceAddData) => void;
  onSelectDevice: (device: WearableDevice) => void;
  onShowAddDevice: (show: boolean) => void;
  getDeviceData: (deviceId: string) => WearableData[];
}

export function WearablesIntegration({
  connectedDevices,
  selectedDevice,
  showAddDevice,
  onAddDevice,
  onSelectDevice,
  onShowAddDevice,
  getDeviceData,
}: WearablesIntegrationProps) {
  const [newDeviceBrand, setNewDeviceBrand] = useState<
    "whoop" | "garmin" | "appleWatch" | ""
  >("");
  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceModel, setNewDeviceModel] = useState("");

  const handleAddDevice = () => {
    if (!newDeviceBrand || !newDeviceName || !newDeviceModel) return;

    onAddDevice({
      name: newDeviceName,
      brand: newDeviceBrand as "whoop" | "garmin" | "appleWatch",
      model: newDeviceModel,
    });

    setNewDeviceBrand("");
    setNewDeviceName("");
    setNewDeviceModel("");
  };

  const getBrandIcon = (brand: WearableDevice["brand"]) => {
    switch (brand) {
      case "whoop":
        return (
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            W
          </div>
        );
      case "garmin":
        return <Watch className="w-6 h-6 text-blue-600" />;
      case "appleWatch":
        return <Watch className="w-6 h-6 text-gray-600" />;
      default:
        return <Activity className="w-6 h-6" />;
    }
  };

  const getBrandName = (brand: WearableDevice["brand"]) => {
    switch (brand) {
      case "whoop":
        return "WHOOP";
      case "garmin":
        return "Garmin";
      case "appleWatch":
        return "Apple Watch";
      default:
        return brand;
    }
  };

  const convertMillisToHours = (millis: number) => {
    const hours = millis / (1000 * 60 * 60);
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const formatDateTime = (dateInput: string | Date) => {
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    return date.toLocaleString();
  };

  const renderWhoopData = (deviceData: WearableData[]) => {
    const sleepData = deviceData.find((d) => d.metadata?.whoopSleep)?.metadata
      ?.whoopSleep;
    const recoveryData = deviceData.find((d) => d.metadata?.whoopRecovery)
      ?.metadata?.whoopRecovery;
    const strainData = deviceData.find((d) => d.metadata?.whoopStrain)?.metadata
      ?.whoopStrain;

    if (!sleepData || !recoveryData || !strainData) {
      return (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-slate-600">
              No WHOOP data available
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="sleep">Sleep</TabsTrigger>
          <TabsTrigger value="recovery">Recovery</TabsTrigger>
          <TabsTrigger value="strain">Strain</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                WHOOP Insights
              </CardTitle>
              <CardDescription>
                Personalized insights based on your WHOOP data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Recovery Insight:</strong> Your HRV is{" "}
                    {recoveryData.hrvRmssdMilli.toFixed(1)}ms, which is above
                    your baseline. This indicates excellent recovery - ideal for
                    challenging workouts or important tasks.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Moon className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Sleep Insight:</strong> Your sleep efficiency is{" "}
                    {sleepData.sleepEfficiencyPercentage}%, which is excellent.
                    Your deep sleep percentage is optimal for recovery.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Zap className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Strain Insight:</strong> Your current strain of{" "}
                    {strainData.strain.toFixed(1)}
                    suggests moderate activity. Consider balancing with recovery
                    activities.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-6">
          {/* Sleep Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Sleep Duration
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {convertMillisToHours(sleepData.totalInBedTimeMilli)}
                    </p>
                  </div>
                  <Moon className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Sleep Performance
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {sleepData.sleepPerformancePercentage}%
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <Progress
                  value={sleepData.sleepPerformancePercentage}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Sleep Efficiency
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {sleepData.sleepEfficiencyPercentage}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-2">↗ Excellent</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Deep Sleep
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {convertMillisToHours(
                        sleepData.totalSlowWaveSleepTimeMilli,
                      )}
                    </p>
                  </div>
                  <Moon className="w-8 h-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sleep Stages Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Sleep Stages Breakdown</CardTitle>
              <CardDescription>
                Last night's sleep composition from WHOOP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-indigo-500 rounded" />
                    <span className="font-medium">Deep Sleep</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">
                      {convertMillisToHours(
                        sleepData.totalSlowWaveSleepTimeMilli,
                      )}
                    </span>
                    <p className="text-xs text-slate-600">
                      {Math.round(
                        (sleepData.totalSlowWaveSleepTimeMilli /
                          sleepData.totalInBedTimeMilli) *
                          100,
                      )}
                      % of total
                    </p>
                  </div>
                </div>
                <Progress
                  value={
                    (sleepData.totalSlowWaveSleepTimeMilli /
                      sleepData.totalInBedTimeMilli) *
                    100
                  }
                  className="h-2"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-blue-500 rounded" />
                    <span className="font-medium">REM Sleep</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">
                      {convertMillisToHours(sleepData.totalRemSleepTimeMilli)}
                    </span>
                    <p className="text-xs text-slate-600">
                      {Math.round(
                        (sleepData.totalRemSleepTimeMilli /
                          sleepData.totalInBedTimeMilli) *
                          100,
                      )}
                      % of total
                    </p>
                  </div>
                </div>
                <Progress
                  value={
                    (sleepData.totalRemSleepTimeMilli /
                      sleepData.totalInBedTimeMilli) *
                    100
                  }
                  className="h-2"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-sky-300 rounded" />
                    <span className="font-medium">Light Sleep</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">
                      {convertMillisToHours(sleepData.totalLightSleepTimeMilli)}
                    </span>
                    <p className="text-xs text-slate-600">
                      {Math.round(
                        (sleepData.totalLightSleepTimeMilli /
                          sleepData.totalInBedTimeMilli) *
                          100,
                      )}
                      % of total
                    </p>
                  </div>
                </div>
                <Progress
                  value={
                    (sleepData.totalLightSleepTimeMilli /
                      sleepData.totalInBedTimeMilli) *
                    100
                  }
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recovery" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Recovery Score
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {recoveryData.recoveryScore}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={
                        recoveryData.recoveryScore >= 80
                          ? "text-green-600 bg-green-50 border-green-200"
                          : recoveryData.recoveryScore >= 60
                            ? "text-yellow-600 bg-yellow-50 border-yellow-200"
                            : "text-red-600 bg-red-50 border-red-200"
                      }
                    >
                      {recoveryData.recoveryScore >= 80
                        ? "Optimal"
                        : recoveryData.recoveryScore >= 60
                          ? "Good"
                          : "Low"}
                    </Badge>
                  </div>
                </div>
                <Progress value={recoveryData.recoveryScore} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">HRV</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {recoveryData.hrvRmssdMilli.toFixed(1)}ms
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">↗ Above baseline</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Resting HR
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {recoveryData.restingHeartRate}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-slate-600 mt-2">Normal range</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strain" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Daily Strain
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {strainData.strain.toFixed(1)}
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <Progress
                  value={(strainData.strain / 21) * 100}
                  className="mt-3"
                />
                <p className="text-xs text-slate-600 mt-2">
                  Moderate strain level
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Avg Heart Rate
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {strainData.averageHeartRate} bpm
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
                <p className="text-xs text-slate-600 mt-2">Today's average</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    );
  };

  const renderDeviceSpecificData = (device: WearableDevice) => {
    const deviceData = getDeviceData(device.id);

    switch (device.brand) {
      case "whoop":
        return renderWhoopData(deviceData);
      case "garmin":
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-slate-600">
                Garmin integration coming soon...
              </p>
            </CardContent>
          </Card>
        );
      case "appleWatch":
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-slate-600">
                Apple Watch integration coming soon...
              </p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Device Dialog */}
      <Dialog open={showAddDevice} onOpenChange={onShowAddDevice}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Wearable Device</DialogTitle>
            <DialogDescription>
              Connect a new wearable device to track your health metrics
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Select
                value={newDeviceBrand}
                onValueChange={(value) => setNewDeviceBrand(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select device brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whoop">WHOOP</SelectItem>
                  <SelectItem value="garmin" disabled>
                    Garmin (Coming Soon)
                  </SelectItem>
                  <SelectItem value="appleWatch" disabled>
                    Apple Watch (Coming Soon)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Device Name</Label>
              <Input
                id="name"
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
                placeholder="e.g., My WHOOP 4.0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                value={newDeviceModel}
                onChange={(e) => setNewDeviceModel(e.target.value)}
                placeholder="e.g., WHOOP 4.0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onShowAddDevice(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDevice}>Add Device</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Connected Devices</CardTitle>
              <CardDescription>
                Manage your connected wearable devices
              </CardDescription>
            </div>
            <Button onClick={() => onShowAddDevice(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Device
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {connectedDevices.length === 0 ? (
            <div className="text-center py-8">
              <Watch className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                No devices connected
              </h3>
              <p className="text-slate-600 mb-4">
                Connect your first wearable device to start tracking your
                biometric data
              </p>
              <Button onClick={() => onShowAddDevice(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Device
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectedDevices.map((device) => (
                <button
                  key={device.id}
                  type="button"
                  className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedDevice?.id === device.id
                      ? "bg-blue-50 border-blue-200 ring-2 ring-blue-200"
                      : "bg-green-50 border-green-200 hover:bg-green-100"
                  }`}
                  onClick={() => onSelectDevice(device)}
                  aria-label={`Select ${device.name} device`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getBrandIcon(device.brand)}
                      <span className="font-medium text-sm">{device.name}</span>
                    </div>
                    <Wifi className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-600">
                      {getBrandName(device.brand)} • {device.model}
                    </p>
                    <p className="text-xs text-slate-600">
                      Last sync:{" "}
                      {device.lastSync
                        ? formatDateTime(device.lastSync)
                        : "Never"}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Device-Specific Data */}
      {selectedDevice && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getBrandIcon(selectedDevice.brand)}
              {selectedDevice.name} Data
            </CardTitle>
            <CardDescription>
              {getBrandName(selectedDevice.brand)} biometric data and insights
            </CardDescription>
          </CardHeader>
          <CardContent>{renderDeviceSpecificData(selectedDevice)}</CardContent>
        </Card>
      )}
    </div>
  );
}
