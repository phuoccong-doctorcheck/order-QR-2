import { Category, MenuItemType } from './store';

export const categories: Category[] = [
  { id: '1', name: 'Main Dishes', nameVi: 'Món chính' },
  { id: '2', name: 'Grilled', nameVi: 'Nướng' },
  { id: '3', name: 'Rice & Soup', nameVi: 'Cơm & Canh' },
  { id: '4', name: 'Vegetables', nameVi: 'Rau' },
  { id: '5', name: 'Drinks', nameVi: 'Nước uống' },
];

export const menuItems: MenuItemType[] = [
  // Main Dishes
  {
    id: '1',
    categoryId: '1',
    name: 'Pho Bo',
    nameVi: 'Phở Bò',
    price: 85000,
    imageUrl: '/images/pho-bo.jpg',
    description: 'Traditional beef noodle soup',
  },
  {
    id: '2',
    categoryId: '1',
    name: 'Banh Mi',
    nameVi: 'Bánh Mì',
    price: 45000,
    imageUrl: '/images/banh-mi.jpg',
    description: 'Vietnamese sandwich with pâté and meat',
  },
  {
    id: '3',
    categoryId: '1',
    name: 'Bun Cha',
    nameVi: 'Bún Chả',
    price: 75000,
    imageUrl: '/images/bun-cha.jpg',
    description: 'Grilled pork with rice noodles',
  },

  // Grilled
  {
    id: '4',
    categoryId: '2',
    name: 'Grilled Chicken',
    nameVi: 'Gà Nướng',
    price: 95000,
    imageUrl: '/images/grilled-chicken.jpg',
    description: 'Charcoal grilled chicken with herbs',
  },
  {
    id: '5',
    categoryId: '2',
    name: 'Grilled Fish',
    nameVi: 'Cá Nướng',
    price: 120000,
    imageUrl: '/images/grilled-fish.jpg',
    description: 'Fresh grilled fish with lemongrass',
  },
  {
    id: '6',
    categoryId: '2',
    name: 'Grilled Shrimp',
    nameVi: 'Tôm Nướng',
    price: 145000,
    imageUrl: '/images/grilled-shrimp.jpg',
    description: 'Jumbo shrimp with garlic butter',
  },

  // Rice & Soup
  {
    id: '7',
    categoryId: '3',
    name: 'Rice with Chicken',
    nameVi: 'Cơm Gà',
    price: 65000,
    imageUrl: '/images/rice-chicken.jpg',
    description: 'Fragrant rice with poached chicken',
  },
  {
    id: '8',
    categoryId: '3',
    name: 'Seafood Soup',
    nameVi: 'Canh Hải Sản',
    price: 95000,
    imageUrl: '/images/seafood-soup.jpg',
    description: 'Delicate seafood broth with vegetables',
  },
  {
    id: '9',
    categoryId: '3',
    name: 'Crab Soup',
    nameVi: 'Canh Cua',
    price: 85000,
    imageUrl: '/images/crab-soup.jpg',
    description: 'Rich crab meat soup with tapioca pearls',
  },

  // Vegetables
  {
    id: '10',
    categoryId: '4',
    name: 'Morning Glory',
    nameVi: 'Rau Muống Xào',
    price: 45000,
    imageUrl: '/images/morning-glory.jpg',
    description: 'Stir-fried with garlic and chili',
  },
  {
    id: '11',
    categoryId: '4',
    name: 'Cabbage Stir-fry',
    nameVi: 'Cải Bắp Xào',
    price: 42000,
    imageUrl: '/images/cabbage.jpg',
    description: 'Fresh cabbage with oyster sauce',
  },
  {
    id: '12',
    categoryId: '4',
    name: 'Broccoli Garlic',
    nameVi: 'Bông Cải Xanh Xào Tỏi',
    price: 48000,
    imageUrl: '/images/broccoli.jpg',
    description: 'Crispy broccoli with fresh garlic',
  },

  // Drinks
  {
    id: '13',
    categoryId: '5',
    name: 'Iced Coffee',
    nameVi: 'Cà Phê Đen Đá',
    price: 25000,
    imageUrl: '/images/coffee.jpg',
    description: 'Traditional Vietnamese iced coffee',
  },
  {
    id: '14',
    categoryId: '5',
    name: 'Fresh Lemonade',
    nameVi: 'Nước Chanh',
    price: 20000,
    imageUrl: '/images/lemonade.jpg',
    description: 'Freshly squeezed lemon juice',
  },
  {
    id: '15',
    categoryId: '5',
    name: 'Sugar Cane Juice',
    nameVi: 'Nước Mía',
    price: 22000,
    imageUrl: '/images/sugarcane.jpg',
    description: 'Fresh pressed sugar cane juice',
  },
];
