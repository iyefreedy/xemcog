import { Link } from "react-router-dom";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="bg-white  shadow-md">
        <div className="h-16 px-6 flex items-center justify-between">
          <Link to={"/"} className="font-semibold">
            {"Xemcog"}
          </Link>
        </div>
      </nav>

      <aside className="absolute top-20 left-4 bg-white shadow-md rounded-md">
        <div className="h-[calc(100vh_-_8rem)] w-60">
          <ul className="p-6 flex flex-col gap-y-1.5">
            <li>
              <Link to={"/dashboard"} className="text-sm">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to={"/users"} className="text-sm">
                Users
              </Link>
            </li>
            <li>
              <Link to={"/experiments"} className="text-sm">
                Experiments
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {children}
    </>
  );
}
