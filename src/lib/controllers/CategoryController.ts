import { CategoryService } from "@/lib/services/CategoryService";
import { handleError } from "@/lib/utils/errorHandler";

export class CategoryController {
  static async getAllCategories() {
    try {
      return await CategoryService.getAllCategories();
    } catch (error) {
      throw new Error(handleError(error));
    }
  }

  static async getCategoryById(id: number) {
    try {
      if (!id) throw new Error("Category ID is required");
      return await CategoryService.getCategoryById(id);
    } catch (error) {
      throw new Error(handleError(error));
    }
  }

  static async upsertCategory(
    id: number | null,
    name: string,
    displayOrder: number
  ) {
    try {
      if (!name || displayOrder < 1) {
        throw new Error("Invalid category data");
      }
      return await CategoryService.upsertCategory(id, name, displayOrder);
    } catch (error) {
      throw new Error(handleError(error));
    }
  }

  static async deleteCategory(id: number) {
    try {
      if (!id) throw new Error("Category ID is required");
      return await CategoryService.deleteCategory(id);
    } catch (error) {
      throw new Error(handleError(error));
    }
  }
}
