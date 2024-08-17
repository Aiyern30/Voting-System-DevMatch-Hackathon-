"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis, // Add YAxis import
  LabelList, // Import LabelList for bar labels
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/Chart";
import { useEffect, useState } from "react";

interface Candidate {
  id: string;
  name: string;
  email?: string;
  gender?: string;
  position?: string;
  voteCount?: string;
}

const Page = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("/api/getCandidates", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: Candidate[] = await response.json();

        const mappedCandidates: Candidate[] = data.map((item: any) => ({
          id: item.cid,
          name: item.candidatename,
          email: item.candidateemail,
          gender: item.candidategender,
          position: item.candidateposition,
          voteCount: item.votecount,
        }));

        setCandidates(mappedCandidates);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchCandidates();
  }, []);

  const chartData = candidates.map((candidate) => ({
    name: candidate.name,
    votes: parseInt(candidate.voteCount || "0"),
  }));

  const chartConfig = {
    votes: {
      label: "Votes",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 p-2 rounded">
          <p>{payload[0].payload.name}</p>
          <p>Votes: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex ">
      <div className="flex justify-center items-center h-full">
        <div className="flex items-center">
          <div className="text-center text-[40px] px-7">
            Oops! Session Timeout
          </div>

          <Image
            src="/Timeout.png"
            alt=""
            width={100}
            height={100}
            className=" mx-auto "
          />
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <ChartContainer config={chartConfig} className="h-[500px] w-[500px]">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickFormatter={(value) => value.toString()} // Ensure values are displayed as strings
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="votes" fill={chartConfig.votes.color} radius={4}>
              <LabelList dataKey="votes" position="top" />{" "}
              {/* Add LabelList here */}
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="text-center space-y-3">
          <div className="text-3xl font-bold">Congratulations!</div>
          <Avatar className="mx-auto w-[150px] h-[150px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Card>
            <CardContent className="flex p-4">
              <div>
                <div>Total voters:</div>
                <div>Name:</div>
                <div>Age:</div>
                <div>Gender:</div>
                <div>Position:</div>
                <div>Working experience:</div>
              </div>
              <div>
                <div>228</div>
                <div>Pearly Tan</div>
                <div>24</div>
                <div>Female</div>
                <div>IT Manager</div>
                <div>3 Years</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
