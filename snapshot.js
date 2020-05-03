const generateConfig = () => ({
  url: 'https://www.google.com',
  query: 'a=1&b=2',
  hash: '#hash',
  port: ':80',
  time: new Date(),
});

const generateAnotherConfig = () => ({
  url: 'https://www.google.com',
  query: 'a=1&b=2',
  hash: '#hash',
  port: ':443',
});

export { generateConfig, generateAnotherConfig };
