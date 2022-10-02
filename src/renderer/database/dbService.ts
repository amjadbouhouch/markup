import DataBase from './DB';
/**
 * https://dexie.org/docs/Tutorial/React
 */
class DbService {
  private db: DataBase;

  constructor() {
    this.db = new DataBase();
  }

  findPages() {
    return this.db.pages.toArray();
  }

  createPage(name: string) {
    console.info(`Create new Page with [name]= ${name}`);
    return this.db.pages.add({
      content: '',
      name,
    });
  }

  getPageById(id: number) {
    console.info(`get page by [id]= ${id}`);
    return this.db.pages.get(id);
  }

  updatePageContent(id: number, content = '') {
    console.info(`updatePageContent [id]= ${id}`);
    return this.db.pages.update(id, {
      content,
    });
  }
}

const dbService = new DbService();
export default dbService;
