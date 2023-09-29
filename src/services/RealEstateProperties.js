import { DBConn } from './DBConn';

export class RealEstateProperties {
  static TABLE_NAME = 'real_estate_properties';

  static async getAll() {
    let { data: real_estate_properties, error } = await DBConn
      .from(this.TABLE_NAME)
      .select();

    if (error) {
      throw error;
    }

    return real_estate_properties;
  }
}
