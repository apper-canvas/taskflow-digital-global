import categories from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categories];
  }

  async getAll() {
    await this.delay();
    return [...this.categories];
  }

  async getById(id) {
    await this.delay();
    return this.categories.find(category => category.Id === id) || null;
  }

  async create(categoryData) {
    await this.delay();
    const newCategory = {
      ...categoryData,
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

  async update(id, categoryData) {
    await this.delay();
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories[index] = { ...this.categories[index], ...categoryData };
    return { ...this.categories[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found");
    }
    
    this.categories.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
  }
}

export const categoryService = new CategoryService();