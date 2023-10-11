module.exports = {
  builds: [
    {
      src: "./app",
      use: "@vercel/next.js",
      config: {
        buildScripts: ["prisma generate"],
      },
    },
  ],
};
