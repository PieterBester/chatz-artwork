export interface Store {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  whatsapp: string;
  logo?: string;
  color: string;
}

export const stores: Store[] = [
  {
    id: 'newcastle',
    name: 'Chatz Connect Newcastle',
    location: 'Amajuba Mall',
    address: 'Amajuba Mall, Newcastle',
    phone: '0343124289',
    whatsapp: '0609718728',
    logo: '/logos/placeholder.svg',
    color: '#1E40AF'
  },
  {
    id: 'vryheid',
    name: 'Chatz Connect Vryheid',
    location: 'Vryheid Mall',
    address: 'Vryheid Mall, Vryheid',
    phone: '0349801234',
    whatsapp: '0601234567',
    logo: '/logos/placeholder.svg',
    color: '#059669'
  },
  {
    id: 'ermelo',
    name: 'Chatz Connect Ermelo',
    location: 'Ermelo Mall',
    address: 'Ermelo Mall, Ermelo',
    phone: '0178191234',
    whatsapp: '0609876543',
    logo: '/logos/placeholder.svg',
    color: '#DC2626'
  }
];

export const getStoreById = (id: string): Store | undefined => {
  return stores.find(store => store.id === id);
};
