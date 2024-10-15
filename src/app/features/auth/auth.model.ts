export interface RegisterCredentials {
    username: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
  }
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface UserAuthenticated {
    username: string;
    role: string;
    token: string;
  }