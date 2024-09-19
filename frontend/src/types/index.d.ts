import { AxiosError } from "axios";

export type Credential = {
  email: string;
  password: string;
};

export interface User {
  id: number;
  email: string;
  fullname: string;
  is_admin: boolean;
  stimulis: Stimuli[];
  created_at: string;
  updated_at: string;
}

export interface Stimuli {
  id: number;
  word: string;
  round: number;
  grammatical: string;
}

export interface Experiment {
  id: number;
  user: User;
  sessions: Session[];
  start_time: string;
  end_time: string;
}

export interface Session {
  id: number;
  stimuli: Stimuli;
  start_time: string;
  end_time: string;
  rating: Rating;
  drawing: Drawing;
  input: Input;
  sentence: Sentence;
}

export interface Rating {
  id: number;
  rate: number;
  start_time: string;
  end_time: string;
}

export interface Drawing {
  id: number;
  image_path: string;
  start_time: string;
  end_time: string;
}

export interface Input {
  id: number;
  inputted_word: string;
  start_time: string;
  end_time: string;
}

export interface Sentence {
  id: number;
  inputted_sentence: string;
  start_time: string;
  end_time: string;
}

export type AuthContextProps = {
  user: User | null;
  error: AxiosError | undefined;
  loading: boolean;
  handleLogin: (data: Credential) => Promise<void>;
  handleLogout: () => Promise<void>;
};
