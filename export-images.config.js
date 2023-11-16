/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  convertFormat: [
    ['png', 'avif'],
    ['jpg', 'avif'],
    ['jpeg', 'avif'],
  ],
  generateFormats: ['avif'],
  sharpOptions: {
    avif: {
      effort: 0,
    },
  },
};

module.exports = config;
