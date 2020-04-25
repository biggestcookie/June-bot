/* eslint-disable @typescript-eslint/camelcase */
import { getRandomBetweenRange } from "@/utils/utils";
import axios from "axios";

const url = "https://api.pushshift.io/reddit/search";

const instance = axios.create({
  baseURL: url,
  timeout: 10000
});

function getDateRange(): { startDate: number; endDate: number } {
  const currentDate = Math.round(new Date().getTime() / 1000);
  const oneWeekAgo = currentDate - 604800;
  const twoYearsAgo = currentDate - 62899200;
  const randomDate = getRandomBetweenRange(twoYearsAgo, oneWeekAgo);
  return { startDate: randomDate - 604800, endDate: randomDate };
}

export async function getRandomTopPostsFromSub(
  subreddit: string,
  quantity = 1
): Promise<string[]> {
  const calls = Array.from({ length: quantity }, () => {
    const { startDate, endDate } = getDateRange();
    return instance({
      method: "get",
      url: "/submission",
      params: {
        size: 1,
        sort: "desc",
        sort_type: "score",
        after: startDate,
        before: endDate,
        over_18: false,
        stickied: false,
        is_video: false,
        subreddit
      }
    });
  });
  const responses = await axios.all(calls);
  return responses.map(response => response.data.data[0].url);
}
