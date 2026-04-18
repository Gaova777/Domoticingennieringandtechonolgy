export type Brand = {
  id: string;
  name: string;
  accent: 'cyan' | 'magenta' | 'yellow' | 'green';
};

export const MOCK_BRANDS: Brand[] = [
  { id: 'hikvision', name: 'Hikvision', accent: 'cyan' },
  { id: 'dahua', name: 'Dahua', accent: 'magenta' },
  { id: 'ezviz', name: 'EZVIZ', accent: 'yellow' },
  { id: 'sonoff', name: 'Sonoff', accent: 'green' },
  { id: 'tuya', name: 'Tuya', accent: 'cyan' },
  { id: 'shelly', name: 'Shelly', accent: 'magenta' },
  { id: 'xiaomi', name: 'Xiaomi', accent: 'yellow' },
];
