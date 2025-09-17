import tasks from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...tasks];
    // Prepare for future user context integration
    this.currentUserId = null; // Will be set when auth is implemented
  }

  // Future RLS Policy: SELECT WHERE user_id = auth.uid()
  async getAll(userId = null) {
    await this.delay();
    // For now, return all tasks. With RLS, filter by user_id
    return [...this.tasks];
  }

// Future RLS Policy: SELECT WHERE user_id = auth.uid() AND id = $1
  async getById(id, userId = null) {
    await this.delay();
    // With RLS, add: WHERE user_id = auth.uid()
    return this.tasks.find(task => task.Id === id) || null;
  }

  // Future RLS Policy: INSERT with user_id = auth.uid() automatically set
  async create(taskData, userId = null) {
    await this.delay();
    const newTask = {
      ...taskData,
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      completed: false,
      completedAt: null,
      // user_id: userId || auth.uid() - will be added with database
    };
    this.tasks.push(newTask);
    return { ...newTask };
  }

// Future RLS Policy: UPDATE WHERE user_id = auth.uid() AND id = $1
  async update(id, taskData, userId = null) {
    await this.delay();
    // With RLS, query will automatically filter by user_id
    const index = this.tasks.findIndex(task => task.Id === id);
    if (index === -1) {
      throw new Error("Task not found or access denied");
    }
    
    this.tasks[index] = { ...this.tasks[index], ...taskData };
    return { ...this.tasks[index] };
  }

  // Future RLS Policy: DELETE WHERE user_id = auth.uid() AND id = $1
  async delete(id, userId = null) {
    await this.delay();
    // With RLS, query will automatically filter by user_id
    const index = this.tasks.findIndex(task => task.Id === id);
    if (index === -1) {
      throw new Error("Task not found or access denied");
    }
    
    this.tasks.splice(index, 1);
    return true;
  }

  delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200));
  }
}

export const taskService = new TaskService();