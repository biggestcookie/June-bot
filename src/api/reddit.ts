import { getRandomBetweenRange } from "@/utils/utils";
import axios from "axios";
import { MessageEmbed } from "discord.js";
import { getRandomElement } from "@/utils/utils";

const url = "https://api.pushshift.io/reddit/search";
const redditIconUrl =
  "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png";

const instance = axios.create({
  baseURL: url,
  timeout: 10000,
});

function getDateRange(): { startDate: number; endDate: number } {
  const currentDate = Math.round(new Date().getTime() / 1000);
  const oneWeekAgo = currentDate - 604800;
  const twoYearsAgo = currentDate - 62899200;
  const randomDate = getRandomBetweenRange(twoYearsAgo, oneWeekAgo);
  return { startDate: randomDate - 604800, endDate: randomDate };
}

export async function getRandomTopPostsFromSubs(
  subreddits: string[],
  quantity = 1,
): Promise<MessageEmbed[]> {
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
        subreddit: getRandomElement(subreddits),
      },
    });
  });
  const responses = await axios.all(calls);
  return responses.map((response) => {
    const responseData = response.data.data[0];
    const message = new MessageEmbed();
    if (responseData) {
      message
        .setURL(responseData.full_link)
        .setImage(responseData.url)
        .setTitle(responseData.title)
        .setAuthor(
          `r/${responseData.subreddit}`,
          redditIconUrl,
          `https://reddit.com/r/${responseData.subreddit}`,
        );
    }
    return message;
  });
}
