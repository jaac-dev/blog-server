export const config = () => ({
  app: {
    host: process.env.APP_HOST ?? "0.0.0.0",
    port: parseInt(process.env.APP_PORT ?? "8080") ?? 8080,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
});
