import { UserCircleIcon, BellAlertIcon } from "@heroicons/react/16/solid";
import SearchBar from "./SearchBar";

export default function NavBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-shrink-4">
        <SearchBar />
      </div>
      <div className="flex flex-row">
        <UserCircleIcon className="text-white w-8 mr-4 mt-4" />
        <BellAlertIcon className="text-white w-8 mr-8 mt-4" />
      </div>
    </div>
  );
}
