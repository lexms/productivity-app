"use client";

import { WearablesIntegration } from "@/components/wearables-integration";
import { PageHeader } from "@/components/molecules/page-header";
import type { WearableDevice, WearableData } from "@/lib/db/schema";
import { useState } from "react";

export default function WearablesPage() {
  // Mock devices to show by default
  const defaultMockDevices: WearableDevice[] = [
    {
      id: "whoop-device-1",
      userId: "mock-user-id",
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      updatedAt: new Date(),
      name: "My WHOOP 4.0",
      brand: "whoop",
      model: "WHOOP 4.0",
      lastSync: new Date(Date.now() - 3600000), // 1 hour ago
    },
  ];

  const [connectedDevices, setConnectedDevices] =
    useState<WearableDevice[]>(defaultMockDevices);
  const [selectedDevice, setSelectedDevice] = useState<WearableDevice | null>(
    defaultMockDevices[0], // Pre-select the WHOOP device
  );
  const [showAddDevice, setShowAddDevice] = useState(false);

  // Mock WHOOP data based on schema structure
  const mockWearableData: WearableData[] = [
    {
      id: "whoop-sleep-data",
      deviceId: "whoop-device-1",
      userId: "mock-user-id",
      createdAt: new Date(Date.now() - 28800000), // 8 hours ago (morning)
      updatedAt: new Date(Date.now() - 28800000),
      timestamp: new Date(Date.now() - 28800000),
      metadata: {
        whoopSleep: {
          totalInBedTimeMilli: 30272735, // ~8.4 hours
          totalLightSleepTimeMilli: 14905851, // ~4.1 hours
          totalSlowWaveSleepTimeMilli: 6630370, // ~1.8 hours
          totalRemSleepTimeMilli: 5879573, // ~1.6 hours
          sleepPerformancePercentage: 85,
          sleepEfficiencyPercentage: 92,
        },
      },
    },
    {
      id: "whoop-recovery-data",
      deviceId: "whoop-device-1",
      userId: "mock-user-id",
      createdAt: new Date(Date.now() - 25200000), // 7 hours ago
      updatedAt: new Date(Date.now() - 25200000),
      timestamp: new Date(Date.now() - 25200000),
      metadata: {
        whoopRecovery: {
          recoveryScore: 78,
          restingHeartRate: 58,
          hrvRmssdMilli: 42.5,
        },
      },
    },
    {
      id: "whoop-strain-data",
      deviceId: "whoop-device-1",
      userId: "mock-user-id",
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      updatedAt: new Date(Date.now() - 3600000),
      timestamp: new Date(Date.now() - 3600000),
      metadata: {
        whoopStrain: {
          strain: 12.4,
          averageHeartRate: 68,
        },
      },
    },
    // Additional mock data for more realistic experience
    {
      id: "whoop-sleep-data-yesterday",
      deviceId: "whoop-device-1",
      userId: "mock-user-id",
      createdAt: new Date(Date.now() - 115200000), // 32 hours ago
      updatedAt: new Date(Date.now() - 115200000),
      timestamp: new Date(Date.now() - 115200000),
      metadata: {
        whoopSleep: {
          totalInBedTimeMilli: 27845620, // ~7.7 hours
          totalLightSleepTimeMilli: 13456789, // ~3.7 hours
          totalSlowWaveSleepTimeMilli: 7890123, // ~2.2 hours
          totalRemSleepTimeMilli: 5234567, // ~1.5 hours
          sleepPerformancePercentage: 72,
          sleepEfficiencyPercentage: 88,
        },
      },
    },
    {
      id: "whoop-recovery-data-yesterday",
      deviceId: "whoop-device-1",
      userId: "mock-user-id",
      createdAt: new Date(Date.now() - 111600000), // 31 hours ago
      updatedAt: new Date(Date.now() - 111600000),
      timestamp: new Date(Date.now() - 111600000),
      metadata: {
        whoopRecovery: {
          recoveryScore: 65,
          restingHeartRate: 61,
          hrvRmssdMilli: 38.2,
        },
      },
    },
  ];

  const handleAddDevice = (deviceData: {
    name: string;
    brand: "whoop" | "garmin" | "appleWatch";
    model: string;
  }) => {
    const newDevice: WearableDevice = {
      id: Date.now().toString(),
      userId: "mock-user-id",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: deviceData.name,
      brand: deviceData.brand,
      model: deviceData.model,
      lastSync: new Date(),
    };

    setConnectedDevices([...connectedDevices, newDevice]);
    setSelectedDevice(newDevice);
    setShowAddDevice(false);
  };

  const handleSelectDevice = (device: WearableDevice) => {
    setSelectedDevice(device);
  };

  const getDeviceData = (deviceId: string) => {
    return mockWearableData.filter((data) => data.deviceId === deviceId);
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Wearables Integration"
        description="Connect and sync your fitness devices"
      />
      <WearablesIntegration
        connectedDevices={connectedDevices}
        selectedDevice={selectedDevice}
        showAddDevice={showAddDevice}
        onAddDevice={handleAddDevice}
        onSelectDevice={handleSelectDevice}
        onShowAddDevice={setShowAddDevice}
        getDeviceData={getDeviceData}
      />
    </div>
  );
}
