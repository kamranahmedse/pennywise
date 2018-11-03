import isUrl from 'is-url';
import parseUrl from 'url-parse';
import queryString from 'query-string';

/**
 * Prepares the embedable URL for the given youtube URL
 * @param url
 * @return {*}
 */
const prepareYoutubeUrl = (url) => {
  const parsedUrl = parseUrl(url, true);
  if (!parsedUrl.host.includes('youtube.com')) {
    return url;
  }

  const queryParams = parsedUrl.query || {};
  let videoHash = queryParams.v || parsedUrl.pathname;

  // Remove slashes – pathname is prefixed with slash
  videoHash = videoHash.replace(/\//g, '');
  // Empty URL or already an embed link
  if (!videoHash || videoHash.includes('embed')) {
    return url;
  }

  // Remove the video hash from query string if available
  // we have the hash already, it will be used in embed code
  delete queryParams.v;
  delete queryParams.index;

  queryParams.autoplay = 1;

  return `https://www.youtube.com/embed/${videoHash}?${queryString.stringify(queryParams)}`;
};

/**
 * Prepares vimeo URL for embed functionality
 * @param url
 * @return {*}
 */
const prepareVimeoUrl = (url) => {
  const parsedUrl = parseUrl(url, true);
  if (!parsedUrl.host.includes('vimeo.com')) {
    return url;
  }

  const videoHash = parsedUrl.pathname.replace(/\//g, '');

  // Vimeo video ids are all numeric
  if (!/^\d+$/.test(videoHash)) {
    return url;
  }

  return `http://player.vimeo.com/video/${videoHash}?autoplay=1&loop=1`;
};

/**
 * Prepares twitch URL for embed functionality
 * @param url
 * @return {*}
 */
const prepareTwitchUrl = (url) => {
  const parsedUrl = parseUrl(url, true);
  if (!parsedUrl.host.includes('twitch.tv')) {
    return url;
  }

  // Return embed link only if on channel page
  if (!parsedUrl.query || !parsedUrl.query.channel) {
    return url;
  }

  return `https://player.twitch.tv?html5&channel=${parsedUrl.query.channel}`;
};

/**
 * Prepares the given URL for loading in webview
 * @param url
 * @return string
 */
export const prepareUrl = function (url) {
  url = url.trim();
  if (!url) {
    return '';
  }

  // Search on google if not a URL
  if (!isUrl(url) && !isUrl(`http://${url}`)) {
    return `https://www.google.com/search?q=${url}`;
  }

  // @todo return this url if magic URLs are disabled
  url = /^http(s)?:\/\//.test(url) ? url : `http://${url}`;

  url = prepareYoutubeUrl(url);
  url = prepareVimeoUrl(url);
  url = prepareTwitchUrl(url);

  url = url.replace('http://www.dailymotion.com/video/', 'http://www.dailymotion.com/embed/video/');
  url = url.replace('http://dai.ly/', 'http://www.dailymotion.com/embed/video/');

  return url;
};
