import categories from "@/services/mockData/categories.json";

class CategoryService {
  constructor() {
    this.categories = [...categories];
    // Prepare for future user context integration
    this.currentUserId = null; // Will be set when auth is implemented
  }

  // Future RLS Policy: SELECT WHERE user_id = auth.uid() OR is_public = true
  async getAll(userId = null) {
    await this.delay();
    // For now, return all categories. With RLS, filter by user_id
    return [...this.categories];
  }

// Future RLS Policy: SELECT WHERE user_id = auth.uid() AND id = $1
  async getById(id, userId = null) {
    await this.delay();
    // With RLS, add: WHERE user_id = auth.uid()
    return this.categories.find(category => category.Id === id) || null;
  }

  // Future RLS Policy: INSERT with user_id = auth.uid() automatically set
  async create(categoryData, userId = null) {
    await this.delay();
    const newCategory = {
      ...categoryData,
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      // user_id: userId || auth.uid() - will be added with database
    };
    this.categories.push(newCategory);
    return { ...newCategory };
  }

// Future RLS Policy: UPDATE WHERE user_id = auth.uid() AND id = $1
  async update(id, categoryData, userId = null) {
    await this.delay();
    // With RLS, query will automatically filter by user_id
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found or access denied");
    }
    
    this.categories[index] = { ...this.categories[index], ...categoryData };
    return { ...this.categories[index] };
  }

  // Future RLS Policy: DELETE WHERE user_id = auth.uid() AND id = $1
  async delete(id, userId = null) {
    await this.delay();
    // With RLS, query will automatically filter by user_id
    const index = this.categories.findIndex(category => category.Id === id);
    if (index === -1) {
      throw new Error("Category not found or access denied");
    }
    
    this.categories.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
  }
}

export const categoryService = new CategoryService();