import {
	Credential,
	Session,
	User,
	Experiment,
	Drawing,
	Rating,
} from "@/types";
import axios from "axios";
import { getCookie } from "@/utils";

const client = axios.create({
	baseURL: import.meta.env.BACKEND_URL,
	withCredentials: true,
});

client.interceptors.request.use(function (config) {
	if (config.method === "get") return config;

	config.headers["X-CSRF-TOKEN"] = getCookie("csrf_access_token");
	return config;
});

export default {
	login: (data: Credential) => {
		return client.post<{ message: string }>("/api/login", data);
	},
	authenticate: () => {
		return client.get<User>("/api/authenticate");
	},
	startExperiment: (data: { user_id: number; start_time: string }) => {
		return client.post<Experiment>("/api/experiments", data);
	},
	endExperiment: (data: { experiment_id: number; end_time: string }) => {
		return client.put<Experiment>(`/api/experiments/${data.experiment_id}`, {
			end_time: data.end_time,
		});
	},
	getExperiments: () => {
		return client.get<Experiment[]>(`/api/experiments`);
	},
	getExperiment: (experimentId: string) => {
		return client.get<Experiment>(`/api/experiments/${experimentId}`);
	},
	startSession: (data: {
		word: string;
		experiment_id: number;
		start_time: string;
	}) => {
		return client.post<Session>("/api/sessions", data);
	},
	endSession: ({
		session_id,
		end_time,
	}: {
		session_id: number;
		end_time: string;
	}) => {
		return client.put<Session>(`/api/sessions/${session_id}`, { end_time });
	},
	saveDrawing: (formData: FormData) => {
		return client.post<Drawing>("/api/drawings", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
	saveRating: (data: { session_id: number; rate: number }) => {
		return client.post<Rating>("/api/ratings", data);
	},
};
