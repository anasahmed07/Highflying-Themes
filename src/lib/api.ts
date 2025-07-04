const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface User {
  _id: string;
  email: string;
  username: string;
  created_at: string;
  is_active: boolean;
  bio?: string;
  location?: string;
  website?: string;
  social_links?: Record<string, string>;
  profile_image?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  username: string;
  password: string;
}

export interface ProfileUpdateData {
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  social_links?: Record<string, string>;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface ApiError {
  detail: string;
  status_code?: number;
  type?: string;
}

export interface ITheme {
  id: string;
  theme_id: number;
  name: string;
  author_name: string;
  short_description: string;
  description: string;
  tags: string[];
  preview_b64?: string;
  icon_b64?: string;
  bgm_info?: string;
  download_count?: number;
  created_at?: string;
  updated_at?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        let errorMessage = 'An error occurred';
        
        try {
          const errorData: ApiError = await response.json();
          errorMessage = errorData.detail || `HTTP error! status: ${response.status}`;
        } catch {
          // If we can't parse the error response, use status-based messages
          switch (response.status) {
            case 400:
              errorMessage = 'Bad request. Please check your input.';
              break;
            case 401:
              errorMessage = 'Authentication failed. Please log in again.';
              break;
            case 403:
              errorMessage = 'Access denied. You don\'t have permission for this action.';
              break;
            case 404:
              errorMessage = 'Resource not found.';
              break;
            case 409:
              errorMessage = 'Conflict. This resource already exists.';
              break;
            case 422:
              errorMessage = 'Validation error. Please check your input.';
              break;
            case 429:
              errorMessage = 'Too many requests. Please try again later.';
              break;
            case 500:
              errorMessage = 'Server error. Please try again later.';
              break;
            case 502:
              errorMessage = 'Bad gateway. Please try again later.';
              break;
            case 503:
              errorMessage = 'Service unavailable. Please try again later.';
              break;
            default:
              errorMessage = `HTTP error! status: ${response.status}`;
          }
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error. Please check your connection.');
    }
  }

  // Authentication methods
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: SignupData): Promise<User> {
    return this.request<User>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/auth/profile');
  }

  async updateProfile(profileData: ProfileUpdateData): Promise<User> {
    return this.request<User>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return this.request<{ message: string }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
  }

  async verifyToken(): Promise<{ valid: boolean; email: string }> {
    return this.request<{ valid: boolean; email: string }>('/auth/verify-token');
  }

  async deleteAccount(hardDelete: boolean = false): Promise<{ message: string }> {
    // Default to soft delete (hardDelete = false)
    // Set hardDelete = true only for permanent deletion
    return this.request<{ message: string }>(`/auth/delete-account?hard_delete=${hardDelete}`, {
      method: 'DELETE',
    });
  }

  async uploadProfileImage(file: File): Promise<{ message: string; image_url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseUrl}/auth/upload-profile-image`;
    
    const config: RequestInit = {
      method: 'POST',
      body: formData,
    };

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          'Authorization': `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({ detail: 'An error occurred' }));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  async submitContactMessage(contactData: ContactMessage): Promise<{ message: string; id: string }> {
    return this.request<{ message: string; id: string }>('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async uploadTheme(formData: FormData): Promise<ITheme> {
    const url = `${this.baseUrl}/themes/upload`;
    const config: RequestInit = {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {}
    };
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          'Authorization': `Bearer ${token}`,
        };
      }
    }
    const response = await fetch(url, config);
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || `HTTP error! status: ${response.status}`;
      } catch {
        errorMessage = `HTTP error! status: ${response.status}`;
      }
      throw new Error(errorMessage);
    }
    return await response.json();
  }

  async getThemeById(id: number): Promise<ITheme> {
    return this.request<ITheme>(`/themes/${id}`);
  }
  
  async downloadThemeById(id: number): Promise<Blob> {
    const url = `${this.baseUrl}/themes/download/${id}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to download theme');
    return await res.blob();
  }

  async getThemes(page = 1, limit = 15, filters?: Record<string, string>) {
    let queryString = `?page=${page}&limit=${limit}`;
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        queryString += `&${key}=${value}`;
      });
    }
    return this.request<{ themes: ITheme[]; total: number; page: number; limit: number }>(`/themes${queryString}`);
  }
  
    public async fetchJson<T>(endpoint: string): Promise<T> {
      return this.request<T>(endpoint);
    }
    
}

export const apiService = new ApiService();