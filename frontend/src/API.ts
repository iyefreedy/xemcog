import {
  Credential,
  Session,
  User,
  Experiment,
  Drawing,
  Rating,
  Input,
  Sentence,
} from "@/types";
import axios from "axios";
import { getCookie } from "@/utils";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

client.interceptors.request.use(function (config) {
  if (config.method === "get") return config;

  config.headers["X-CSRF-TOKEN"] = getCookie("csrf_access_token");
  return config;
});

export default {
  login: (data: Credential) => {
    return client.post<{ message: string }>("/login", data);
  },
  authenticate: () => {
    return client.get<User>("/authenticate");
  },
  startExperiment: (data: { user_id: number; start_time: string }) => {
    return client.post<Experiment>("/experiments", data);
  },
  endExperiment: (data: { experiment_id: number; end_time: string }) => {
    return client.put<Experiment>(`/experiments/${data.experiment_id}`, {
      end_time: data.end_time,
    });
  },
  getExperiments: () => {
    return client.get<Experiment[]>(`/experiments`);
  },
  getExperiment: (experimentId: string) => {
    return client.get<Experiment>(`/experiments/${experimentId}`);
  },
  startSession: (data: {
    stimuli_id: number;
    experiment_id: number;
    start_time: string;
  }) => {
    return client.post<Session>("/sessions", data);
  },
  endSession: ({
    session_id,
    end_time,
  }: {
    session_id: number;
    end_time: string;
  }) => {
    return client.put<Session>(`/sessions/${session_id}`, { end_time });
  },
  saveDrawing: (formData: FormData) => {
    return client.post<Drawing>("/drawings", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveRating: (data: { session_id: number; rate: number }) => {
    return client.post<Rating>("/ratings", data);
  },
  saveInputtedWord: (data: {
    session_id: number;
    input: string;
    start_time: string;
    end_time: string;
  }) => {
    return client.post<Input>("/inputs", data);
  },
  saveInputtedSentence: (data: {
    session_id: number;
    sentence: string;
    start_time: string;
    end_time: string;
  }) => {
    return client.post<Sentence>("/sentences", data);
  },
};
