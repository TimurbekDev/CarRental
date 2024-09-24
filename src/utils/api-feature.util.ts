type sortOrderType = 'ASC' | 'DESC';

declare interface FilterOptionsInterface {
  table: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: sortOrderType;
  fields?: string[];
  filters?: Record<string, any>;
}

export class ApiFeature {
  private query: string | null = null;
  private filterOptions: FilterOptionsInterface;

  constructor(tableName: string) {
    this.filterOptions = {
      table: tableName,
      page: 1,
      limit: 10,
      sort: 'id',
      sortOrder: 'ASC',
      fields: ['*'],
      filters: {},
    };
  }

  paginate(page: number = 1, limit: number = 10) {
    this.filterOptions.page = page;
    this.filterOptions.limit = limit;
    return this;
  }

  sort(sortField: string, sortOrder: sortOrderType = 'ASC') {
    this.filterOptions.sort = sortField || 'id';
    this.filterOptions.sortOrder = sortOrder;
    return this;
  }

  filter(filters: Record<string, any>) {
    this.filterOptions.filters = { ...this.filterOptions.filters, ...filters };
    return this;
  }

  getQuery(): string {
    const { table, fields, page, limit, sort, sortOrder, filters } = this.filterOptions;
    const selectFields = fields?.length ? fields.join(', ') : '*';
    const offset = (page! - 1) * limit!;
    
    const filterQuery = Object.entries(filters)
      .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
      .join(' AND ');

    const whereClause = filterQuery ? `WHERE ${filterQuery}` : '';

    this.query = `
      SELECT ${selectFields} 
      FROM ${table}
      ${whereClause}
      ORDER BY ${sort} ${sortOrder}
      LIMIT ${limit}
      OFFSET ${offset}
    `.trim();

    return this.query;
  }
}