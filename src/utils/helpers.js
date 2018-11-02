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

  return `https://www.youtube.com/embed/${videoHash}?${queryString.stringify(queryParams)}`;
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
  
  return url;
};
