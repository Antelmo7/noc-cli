interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
  public async execute(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);
      if (res.ok) {
        console.log(`CheckService ${url} is up`);
        return true;
      } else throw new Error(`Error on CheckService ${url}`);
    } catch (error) {
      console.error(`${error}`);
      return false;
    }
  }
}
