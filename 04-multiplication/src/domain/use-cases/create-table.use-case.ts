export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {} // Dependency Injeciton

  execute({ base, limit = 10 }: CreateTableOptions) {
    const header: string = `
========================================
            Tabla del  ${base}
========================================
`;
    let messageOutput = "";
    for (let i = 1; i <= limit; i++) {
      messageOutput += `${base} x ${i} = ${base * i}\n`;
    }
    return header + messageOutput;
  }
}
