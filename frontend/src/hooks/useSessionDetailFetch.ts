import API from "@/API";
import { Session } from "@/types";
import { useEffect, useState } from "react";

export const useSessionDetailFetch = (sessionId: string) => {
  const [session, setSession] = useState<Session>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExperiment = async () => {
      try {
        setLoading(true);
        const res = await API.getSessionById(sessionId);
        console.log(res);

        setSession(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiment();
  }, []);

  return { session, loading };
};
