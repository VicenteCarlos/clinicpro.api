export abstract class Transformer {
  public async item(data: unknown) {
    return data;
  }

  public async transform(item: unknown) {
    return { data: await this.transform(item) };
  }

  public async collection(itens: unknown[]) {
    return {
      data: itens.map(async (item) => await this.transform(item)),
    };
  }
}
