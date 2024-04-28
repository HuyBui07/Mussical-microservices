import { TEChart } from "tw-elements-react";

export default function ChartLine() {
  return (
    <div className="m-2 ml-4 bg-zinc-800" style={{ borderRadius: "10px" }}>
      <TEChart
        className="ml-8 mr-8 text-xl"
        type="line"
        data={{
          labels: ["week 1", "week 2", "week 3", "week 4"],
          datasets: [
            {
              borderColor: "pink",
              backgroundColor: "pink",
              borderWidth: 5,
              label: "Chúng ta của hiện tại",
              data: [123, 2343, 2545, 34237],
            },
            {
              borderColor: "green",
              backgroundColor: "green",
              borderWidth: 5,
              label: "The box",
              data: [34237, 32999, 18212, 2],
            },
            {
              borderWidth: 5,
              borderColor: "lightblue",
              backgroundColor: "lightblue",
              label: "Chúng ta của tương lai",
              data: [3423, 7754, 27777, 987],
            },
          ],
        }}
      />
    </div>
  );
}
