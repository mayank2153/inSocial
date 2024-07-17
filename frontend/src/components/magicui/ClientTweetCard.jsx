"use client";

import { useTweet } from "react-tweet";
import {
  MagicTweet,
  TweetNotFound,
  TweetSkeleton,
} from "./tweetCard.jsx";

const ClientTweetCard = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  components,
  fetchOptions,
  onError,
  ...props
}) => {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions);

  if (isLoading) return fallback;
  if (error || !data) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={onError ? onError(error) : error} />;
  }

  return <MagicTweet tweet={data} components={components} {...props} />;
};

export default ClientTweetCard;
