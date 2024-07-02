import { Configuration } from "@/configs/Configuration";

export class ConfigManager {
  private configsMap: Map<Configuration, any> = new Map();

  public get<T = any>(key: Configuration): T {
    if (this.configsMap.has(key)) {
      return this.configsMap.get(key);
    }

    throw new Error(`${key} are not define at .env`);
  }

  public load(): void {
    if (!process.env.HOST) {
      throw new Error("You are not define HOST at .env");
    }

    if (!process.env.PORT) {
      throw new Error("You are not define PORT at .env");
    }

    this.configsMap.set(Configuration.HOST, process.env.HOST);
    this.configsMap.set(Configuration.PORT, process.env.PORT);
  }
}
