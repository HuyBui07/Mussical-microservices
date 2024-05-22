import { BarChart } from "@mui/x-charts/BarChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TopSong from "../../Components/TopSong";
import { useEffect, useState } from "react";
import { Button, Hidden } from "@mui/material";
import {
  BarSeriesType,
  HighlightScope,
  PieChart,
  pieArcLabelClasses,
} from "@mui/x-charts";
import React from "react";
export interface SongStat {
  song: {
    tags: string[];
    _id: string;
    title: string;
    artist: string;
    source: string;
    poster: string;
    __v: number;
    listenCount: number;
    dateCreated: string;
  };
  count: number;
}

interface TagStat {
  tag: string;
  percentage: number;
}

interface WeeklyListenCount {
  week: number;
  count: number;
}

export default function ChartLine() {
  const [topSongs, setTopSongs] = useState<SongStat[]>([]);
  const [topTags, setTopTags] = useState<TagStat[]>([]);
  const [weeklyListenCount, setWeeklyListenCount] = useState<
    WeeklyListenCount[]
  >([]);
  const [highlighted, setHighlighted] = React.useState("item");
  const [faded, setFaded] = React.useState("global");
  const [loading, setLoading] = useState(true);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const requestStat = async () => {
    try {
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmMDRiNTcyZTcxYzJmMGRmMWI2NDEiLCJpYXQiOjE3MTQzNTc0MzgsImV4cCI6MTcxNDYxNjYzOH0.qWbK65-tM1EfOYEosSziClCkjdmP89Tgla3Gps8oFgs";
      const res = await fetch("http://localhost:4000/api/songs/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      setTopSongs(data.topSongs);
      setTopTags(data.topTags);
      //totalListenCount return an array of 4 , for 4 weeks, except the last one is from 22-> end of month
      const weeklyListenCount = data.totalListenCount.map(
        (count: number, index: number) => ({
          week: index + 1,
          count,
        })
      );
      setWeeklyListenCount(weeklyListenCount);
      console.log(data.totalListenCount);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };
  const callInjectionTest = async () => {
    try {
      const adminToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmMDRiNTcyZTcxYzJmMGRmMWI2NDEiLCJpYXQiOjE3MTQzNTc0MzgsImV4cCI6MTcxNDYxNjYzOH0.qWbK65-tM1EfOYEosSziClCkjdmP89Tgla3Gps8oFgs";
      // const res = await fetch(
      //   "http://localhost:4000/api/songs/stats/injection",
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${adminToken}`,
      //     },
      //   }
      // );

      // songs/stats/tags
      const res = await fetch("http://localhost:4000/api/songs/stats/tags", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      console.log("Result from injection test", data);
    } catch (error) {
      console.error("Injection test failed", error);
    }
  };
  useEffect(() => {
    requestStat();
  }, []);

  return (
    <>
      <Button onClick={callInjectionTest}>Test Injection</Button>
      <div className="flex flex-row justify-between gap-2">
        <div
          className="my-2 ml-6 bg-zinc-800 h-[60vh] w-[50%] flex flex-row py-10 px-10"
          style={{ borderRadius: "10px" }}
        >
          <ThemeProvider theme={darkTheme}>
            {!loading ? (
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "week",
                    label: "Weekly listen count this month",
                    valueFormatter: (value: number) => {
                      //Value = 1,2,3,4
                      //Check this month show Week X (x-y/month)
                      // if (value === 4) return "Week 4 (22-maxDate/ this month)"
                      // for week 1 , return "Week 1 (1-7/ this month)"
                      // for week 2 , return "Week 2 (8-14/ this month)"
                      // for week 3 , return "Week 3 (15-21/ this month)"
                      const date = new Date();
                      const currentMonth = date.getMonth();
                      const currentYear = date.getFullYear();
                      const thisMonthMaxDate = new Date(
                        currentYear,
                        currentMonth + 1,
                        0
                      ).getDate();
                      if (value === 4)
                        return `Week 4 (22-${thisMonthMaxDate}/${
                          currentMonth + 1
                        })`;
                      if (value === 1)
                        return `Week 1 (1-7/${currentMonth + 1})`;
                      if (value === 2)
                        return `Week 2 (8-14/${currentMonth + 1})`;
                      if (value === 3)
                        return `Week 3 (15-21/${currentMonth + 1})`;

                      return "";
                    },
                  },
                ]}
                series={[
                  {
                    label: "Weekly Listen Count",
                    dataKey: "count",
                    highlightScope: {
                      highlighted,
                      faded,
                    } as HighlightScope,
                  },
                ]}
                slotProps={{
                  legend: {
                    hidden: true,
                  },
                }}
                dataset={weeklyListenCount.map((item) => ({
                  week: item.week,
                  count: item.count,
                }))}
              />
            ) : (
              <p>Loading...</p>
            )}
          </ThemeProvider>
        </div>
        <div
          className="my-2 mr-4 bg-zinc-800 h-[60vh] w-[50%] flex flex-col py-10 px-10"
          style={{ borderRadius: "10px" }}
        >
          <div className="flex flex-row justify-between">
            <h1 className="text-white font-bold text-2xl">
              Top tags this month
            </h1>
          </div>

          <PieChart
            series={[
              {
                //Show value, format to show only 1 decimal
                arcLabel: (item) => `${item.value.toFixed(1)}%`,
                data: topTags.map((tag) => ({
                  value: tag.percentage,
                  label: tag.tag,
                })),
                innerRadius: 31,
                outerRadius: 101,
                paddingAngle: 4,
                cornerRadius: 5,
                startAngle: -180,
                endAngle: 180,
                cx: 150,
                cy: 150,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
              },
            }}
            slotProps={{
              legend: {
                direction: "row",
                itemGap: 10,
                position: {
                  vertical: "middle",
                  horizontal: "right",
                },
                labelStyle: {
                  fontWeight: 500,
                  fill: "white",
                },
              },
            }}
          />
        </div>
      </div>
      <div
        className="ml-6 mr-4 bg-zinc-800 h-[36.5vh] flex flex-col py-10 px-10"
        style={{ borderRadius: "10px" }}
      >
        <h2 className="text-white font-bold text-2xl">Top songs this month</h2>
        <div className="flex flex-row gap-2 mt-4">
          {!loading ? (
            topSongs.map((song) => (
              <TopSong
                key={song.song._id}
                data={song}
                rank={topSongs.indexOf(song) + 1}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
