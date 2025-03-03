import TodoItem from '@/app/types/TodoType';
import axios from 'axios';

/**
 * Service class to interact with the Todo API
 * Provides methods to fetch, add, update, and delete todo items
 */
class TodoApiService {
  private baseUrl: string;
  private baseHeaders = { 'Content-Type': 'application/json' };


  /* TODO */
  //Remplacer ici par l'adresse IP de l'ordinateur (serveur) ou par http://10.0.2.2:8080 pour l'émulateur android

  constructor(baseUrl: string = 'http://192.168.1.76:8080') {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetches the todo items from the API
   * @returns - The list of todo items
   */
  async fetchItems(): Promise<TodoItem[]> {
    try {
      const response = await axios.get<TodoItem[]>(`${this.baseUrl}/list`, {
        headers: this.baseHeaders,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to load items');
    }
  }

  /**
   * Adds a new todo item to the API
   * @param item - The todo item to add
   */
  async addItem(item: TodoItem): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/add`, { title: item.title, id: item.id }, {
        headers: this.baseHeaders,
      });
    } catch (error) {
      throw new Error('Failed to add item');
    }
  }

  /**
   * Updates the status of a todo item
   * @param item - The todo item to update
   */
  async updateItem(item: TodoItem): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/update`, { id: item.id, isDone: item.isDone }, {
        headers: this.baseHeaders,
      });
    } catch (error) {
      throw new Error('Failed to update item');
    }
  }

  /**
   * Deletes a todo item from the API
   * @param id - The id of the todo item to delete
   */
  async deleteItem(id: string): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/delete`, { id }, {
        headers: this.baseHeaders,
      });
    } catch (error) {
      throw new Error('Failed to delete item');
    }
  }

  /**
   * Updates the title of a todo item
   * @param id - The id of the todo item to update
   * @param title - The new title of the todo item
   */
  async updateItemTitle(id: string, title: string): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/updateTitle`, { id, title }, {
        headers: this.baseHeaders,
      });
    } catch (error) {
      throw new Error('Failed to update title');
    }
  }
}

export default TodoApiService;
