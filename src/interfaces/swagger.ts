export interface SwaggerSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
    license: {
      name: string;
      url: string;
    };
    contact: {
      name: string;
      url: string;
      email: string;
    };
  };
  servers: Array<{ url: string }>;
  paths: { [key: string]: any };
}

