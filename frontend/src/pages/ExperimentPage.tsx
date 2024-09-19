import { useExperimentFetch } from "@/hooks/useExperimentFetch";
import AdminLayout from "@/layouts/AdminLayout";
import { Link, useParams } from "react-router-dom";

export default function ExperimentPage() {
  const { experimentId } = useParams();

  const { experiment, loading } = useExperimentFetch(experimentId!);

  if (loading) return <p>Loading...</p>;

  return (
    <AdminLayout>
      <main className="ml-72 mt-4">
        <div className="px-6">
          <h1 className="font-semibold text-xl">Experiments</h1>

          <div className="bg-white shadow-md rounded-md mt-4 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-center">No.</th>
                  <th className="text-left">Stimuli Word</th>
                  <th className="text-left">Start time</th>
                  <th className="text-left">End time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {experiment?.sessions.map((session, i) => (
                  <tr key={session.id}>
                    <td className="text-center py-2">{i + 1}</td>
                    <td>{session.stimuli.word}</td>
                    <td>{session.start_time}</td>
                    <td>{session.end_time}</td>
                    <td>
                      <Link
                        to={`/sessions/${session.id}`}
                        className="text-xs bg-green-400 px-1.5 py-1 rounded-md"
                      >
                        See details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
