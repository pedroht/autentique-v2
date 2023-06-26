import document from './document';
import folder from './folder';

class Instance {
  document: ReturnType<typeof document>;
  folder: ReturnType<typeof folder>;

  constructor(
    public token: string = '',
    public sandbox: boolean = !!process.env.AUTENTIQUE_DEV_MODE,
  ) {
    this.document = document({ token: this.token, sandbox: this.sandbox });
    this.folder = folder({ token: this.token, sandbox: this.sandbox });
  }
}

export default new Instance();
