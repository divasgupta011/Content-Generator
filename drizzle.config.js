/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ContentGenerator_owner:ezwrMCl2p8OT@ep-royal-bird-a5d12bds.us-east-2.aws.neon.tech/ContentGenerator?sslmode=require',
    }
  };
  