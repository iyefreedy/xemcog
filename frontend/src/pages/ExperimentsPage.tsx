import { useExperimentsFetch } from "@/hooks/useExperimentsFetch";
import AdminLayout from "@/layouts/AdminLayout";
import { Link } from "react-router-dom";

export default function ExperimentsPage() {
  const { experiments } = useExperimentsFetch();
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
                  <th className="text-left">Participation Name</th>
                  <th className="text-left">Start time</th>
                  <th className="text-left">End time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {experiments.map((experiment, i) => (
                  <tr key={experiment.experiment_id}>
                    <td className="text-center py-2">{i + 1}</td>
                    <td>{experiment.user.fullname}</td>
                    <td>{experiment.start_time}</td>
                    <td>{experiment.end_time}</td>
                    <td>
                      <Link
                        to={`/experiments/${experiment.experiment_id}`}
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
