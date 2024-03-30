import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function MusicPlayer() {
  return (
    <div className="m-2 bg-zinc-800" style={{ borderRadius: "10px" }}>
      <div className="w-full">
        <div className="flex flex-row bg-transparent border-transparent border-b rounded-t-xl space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
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
            <div className="flex flex-row">
              <AudioPlayer
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                className="mt-[-10px] bg-transparent border-0 border-transparent border-none mx-auto"
                customVolumeControls={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
