import { NextRequest, NextResponse } from 'next/server';
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, getMenuCategories } from '@/lib/menu-store';
import type { MenuItemType } from '@/lib/store';

export async function GET(request: NextRequest) {
  try {
    const categories = getMenuCategories();
    const items = getMenuItems();

    return NextResponse.json({
      success: true,
      categories,
      items,
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, nameVi, price, categoryId, description, imageUrl } = body;

    // Validate required fields
    if (!name || !nameVi || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create menu item
    const newItem: MenuItemType = {
      id: '',
      name,
      nameVi,
      price: Number(price),
      categoryId,
      description: description || '',
      imageUrl: imageUrl || '/images/placeholder.jpg',
    };

    const createdItem = addMenuItem(newItem);

    return NextResponse.json(
      {
        success: true,
        item: createdItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding menu item:', error);
    return NextResponse.json(
      { error: 'Failed to add menu item' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Missing item ID' },
        { status: 400 }
      );
    }

    // Convert price to number if provided
    if (updates.price) {
      updates.price = Number(updates.price);
    }

    const updatedItem = updateMenuItem(id, updates);

    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Missing item ID' },
        { status: 400 }
      );
    }

    const deleted = deleteMenuItem(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}
