import xml from "xml2js";

export class XMLBuilder {
  private xmlBuilder: xml.Builder;

  public constructor() {
    this.xmlBuilder = new xml.Builder({
      renderOpts: {
        pretty: true,
      },
    });
  }

  public build(object: any) {
    return this.xmlBuilder.buildObject(object);
  }
}
