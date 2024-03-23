import { UserCircleIcon } from "@heroicons/react/16/solid";
import SearchBar from "./SearchBar";

export default function NavBar() {
    return (
       <div className="flex items-center justify-between">
            <div className="flex-shrink-4">
                <SearchBar/>
            </div>
            <UserCircleIcon className="text-black w-10 mr-8 mt-4"/>
       </div>     
    );
}
