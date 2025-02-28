declare global {
  interface IUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    last_login_time?: string;
    verification_code?: string | null;
    created_at: string;
    updated_at: string;
    /**
     * @usage server-side
     * @description removes sensitive data from the user object
     */
    cleanse(): IUser;
  }
}

export {};
