export type Credential = {
  email: string;
  password: string;
};

export interface User {
  user_id: number;
  email: string;
  fullname: string;
  is_admin: boolean;
  stimuli_word: string;
  created_at: string;
  updated_at: string;
}

export interface Experiment {
  experiment_id: number;
  user_id: number;
  start_time: string;
  end_time: string;
  user: User;
  sessions: Session[];
}

export interface Session {
  drawing: Drawing;
  rating: Rating;
  session_id: number;
  word: string;
  start_time: string;
  end_time: string;
}

export interface Rating {
  rating_id: number;
  session_id: number;
  rate: number;
  created_at: string;
}

export interface Drawing {
  drawing_id: number;
  session_id: number;
  image_path: string;
  created_at: string;
}

export type AuthContextProps = {
  user: User | null;
  handleLogin: (data: Credential) => Promise<void>;
  handleLogout: () => Promise<void>;
};
