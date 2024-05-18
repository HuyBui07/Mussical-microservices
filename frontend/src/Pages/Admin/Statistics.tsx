import { LineChart } from "@mui/x-charts/LineChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TopSong from "../../Components/TopSong";

export default function ChartLine() {
  const labels: string[] = ["Week 1", "Week 2 ", "Week 3", "Week 4"];
  const sample_1: number[] = [1232, 22, 32, 342];
  const sample_2: number[] = [5, 234, 90, 100];
  const sample_3: number[] = [1234, 12, 167, 1700];

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const songs = [
    {
      _id: 123,
      title: "The box",
      poster: "https://i.ytimg.com/vi/uLHqpjW3aDs/maxresdefault.jpg",
    },
    {
      _id: 123,
      title: "Stay",
      poster:
        "https://truyenhinhthanhhoa.qltns.mediacdn.vn/thumb_w/640/dataimages/202110/original/images5722095_Biden1.jpeg",
    },
  ];
  return (
    <>
      <div
        className="m-2 ml-4 bg-zinc-800 h-[60vh]"
        style={{ borderRadius: "10px" }}
      >
        <ThemeProvider theme={darkTheme}>
          <LineChart
            xAxis={[{ data: labels, scaleType: "band" }]}
            yAxis={[{ id: "linearAxis", scaleType: "linear" }]}
            series={[
              {
                yAxisKey: "linearAxis",
                data: sample_1,
                label: "The box",
              },
              { yAxisKey: "linearAxis", data: sample_2, label: "Stay" },
              {
                yAxisKey: "linearAxis",
                data: sample_3,
                label: "Từng là",
                color: "green",
              },
            ]}
            leftAxis="linearAxis"
            height={400}
          />
        </ThemeProvider>
      </div>
      <div
        className="m-2 ml-4 bg-zinc-800 h-[36.5vh] flex flex-row py-10 px-10"
        style={{ borderRadius: "10px" }}
      >
        {songs.map((song, index) => (
          <TopSong key={song._id} data={song} rank={index + 1} />
        ))}
      </div>
    </>
  );
}
