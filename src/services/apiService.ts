import axiosInstance from "../api/axiosConfig";

// Define la estructura de un Dispositivo
export interface Device {
  device_id: string;
  device_name: string;
  device_model: string;
  registered_at: number;
  last_sync_at: number;
  is_active: boolean;
}

// Define la estructura de un Código de Activación
export interface ActivationCode {
  code: string;
  tenant_id: string;
  status: 'pending' | 'used';
  created_at: number;
  expires_at: number | null;
  description: string;
}

// Obtiene los dispositivos desde la API
const getDevices = async (): Promise<Device[]> => {
  console.log("Fetching devices from API...");
  const response = await axiosInstance.get('/admin/devices', {
    headers: {
      'accept': 'application/json',
      'X-Tenant-ID': 'ACME',
    },
  });
  // La API envuelve la respuesta en un objeto "devices"
  return response.data.devices;
};

// Crea un código de activación via API
const createActivationCode = async (code: string, description: string, expires_at: number | null): Promise<ActivationCode> => {
  console.log(`Creating activation code via API: ${code}`);
  const response = await axiosInstance.post('/admin/activation-codes', {
    code,
    description,
    expires_at,
  });
  return response.data;
};

// Desactiva un dispositivo via API
const deactivateDevice = async (deviceId: string): Promise<{ success: true }> => {
    console.log(`Deactivating device via API: ${deviceId}`);
    const response = await axiosInstance.put(`/admin/devices/${deviceId}/deactivate`, {
        reason: "Deactivated from admin dashboard."
    });
    return response.data;
};

const apiService = {
  getDevices,
  createActivationCode,
  deactivateDevice,
};

export default apiService;
