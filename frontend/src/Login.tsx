const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=bfb0c283af364f7c96ea6a7818b65ad5&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-library-read%20user-library-modify";

export default function Login() {
  const handleLogin = () => {
    window.location.href = AUTH_URL;
  };

  return (
    <button
      onClick={handleLogin}
      className="text-white font-bold text-xl border bg-green-500 border-black px-10 py-4 rounded-lg"
    >
      Log in with Spotify
    </button>
  );
}
