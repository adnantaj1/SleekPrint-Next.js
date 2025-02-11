import { CategoryRepository } from "@/lib/repositories/CategoryRepository";

export class CategoryService {
  static async getAllCategories() {
    return await CategoryRepository.getAllCategories();
  }

  static async getCategoryById(id: number) {
    return await CategoryRepository.getCategoryById(id);
  }

  static async upsertCategory(
    id: number | null,
    name: string,
    displayOrder: number
  ) {
    if (!name || displayOrder < 1) {
      throw new Error("Invalid category data");
    }
    return await CategoryRepository.upsertCategory(id, name, displayOrder);
  }

  static async deleteCategory(id: number) {
    return await CategoryRepository.deleteCategory(id);
  }
}
