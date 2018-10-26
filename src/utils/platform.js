const platform = {
  isWindows: process.platform === 'win32',
  isMac: process.platform === 'darwin',
};

module.exports = platform;