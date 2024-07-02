declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "production" | "development";
      HOST: string;
      PORT: number;
    }
  }

  interface User {
    id: string;
    name: string;
  }
}

export {};
