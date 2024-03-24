import {
  PlayCircleIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/16/solid";

export default function MusicPlayer() {
  return (
    <div className="m-2 bg-zinc-800 " style={{ borderRadius: "10px" }}>
      <div className="w-full">
        <div className="flex flex-row bg-transparent border-transparent border-b rounded-t-xl p-4 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
          <div className="flex items-center space-x-4">
            <img
              src="https://img.freepik.com/free-psd/square-flyer-template-maximalist-business_23-2148524497.jpg?w=1800&t=st=1699458420~exp=1699459020~hmac=5b00d72d6983d04966cc08ccd0fc1f80ad0d7ba75ec20316660e11efd18133cd"
              alt=""
              width={88}
              height={88}
              className="flex-none rounded-lg bg-slate-100"
              loading="lazy"
            />
            <div className="min-w-0 flex-auto space-y-1 font-semibold">
              <p className="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
                <abbr title="Track">Track:</abbr> 05
              </p>
              <h2 className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
                Music: New Album The Lorem
              </h2>
              <p className="text-slate-900 dark:text-slate-50 text-lg">
                Spotisimo
              </p>
            </div>
          </div>
          <div className="flex flex-col ml-8 w-2/3">
            <div className="">
              <div className="relative">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 dark:bg-cyan-400 w-1/2 h-2"
                    role="progressbar"
                    aria-label="music progress"
                    aria-valuenow={1456}
                    aria-valuemin={0}
                    aria-valuemax={4550}
                  />
                </div>
                <div className="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
                  <div className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5" />
                </div>
              </div>
              <div className="flex justify-between text-sm leading-6 font-medium tabular-nums">
                <div className="text-cyan-500 dark:text-slate-100">1:75</div>
                <div className="text-slate-500 dark:text-slate-400">3:20</div>
              </div>
            </div>
            <div className="flex flex-row">
              <BackwardIcon className="mr-2 w-8 mx-auto" />

              <PlayCircleIcon className="w-12 mx-auto" />
              <ForwardIcon className="ml-2 w-8 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
