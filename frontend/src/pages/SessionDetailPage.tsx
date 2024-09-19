import { useSessionDetailFetch } from "@/hooks/useSessionDetailFetch";
import AdminLayout from "@/layouts/AdminLayout";
import { useParams } from "react-router-dom";
import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function SessionDetailPage() {
  const { sessionId } = useParams();

  const { session } = useSessionDetailFetch(sessionId!);

  console.log(session);

  return (
    <AdminLayout>
      <main className="ml-72 mt-4">
        <div className="px-6">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Session detail
          </h3>

          <div className="bg-white shadow-md rounded-md mt-4 p-4">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Kata Stimuli
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {session?.stimuli.word}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Kata yang di input
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {session?.input.inputted_word}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Nilai rating kata stimuli
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {session?.rating.rate}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Respon gambar
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <img
                    src={`http://localhost:5000/images/${session?.drawing.image_path}`}
                    alt=""
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Respon Kalimat
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {session?.sentence.inputted_sentence}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
