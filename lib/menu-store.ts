import type { MenuItemType, Category } from './store';

// Import default menu items
import { categories as defaultCategories, menuItems as defaultMenuItems } from './menu-data';

export interface MenuStore {
  categories: Category[];
  items: MenuItemType[];
}

// In-memory store for menu data
let menuStore: MenuStore = {
  categories: JSON.parse(JSON.stringify(defaultCategories)),
  items: JSON.parse(JSON.stringify(defaultMenuItems)),
};

export function getMenuCategories(): Category[] {
  return menuStore.categories;
}

export function getMenuItems(): MenuItemType[] {
  return menuStore.items;
}

export function addMenuItem(item: MenuItemType): MenuItemType {
  // Generate new ID if not provided
  if (!item.id) {
    const maxId = Math.max(...menuStore.items.map(i => parseInt(i.id) || 0), 0);
    item.id = String(maxId + 1);
  }

  menuStore.items.push(item);
  return item;
}

export function updateMenuItem(id: string, updates: Partial<MenuItemType>): MenuItemType | null {
  const index = menuStore.items.findIndex(item => item.id === id);
  if (index === -1) return null;

  menuStore.items[index] = { ...menuStore.items[index], ...updates };
  return menuStore.items[index];
}

export function deleteMenuItem(id: string): boolean {
  const index = menuStore.items.findIndex(item => item.id === id);
  if (index === -1) return false;

  menuStore.items.splice(index, 1);
  return true;
}

export function getMenuItemsByCategory(categoryId: string): MenuItemType[] {
  return menuStore.items.filter(item => item.categoryId === categoryId);
}

export function getCategoryById(id: string): Category | null {
  return menuStore.categories.find(cat => cat.id === id) || null;
}
