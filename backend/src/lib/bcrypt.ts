import * as bc from 'bcrypt';

export const hash = (data: string): Promise<string> => bc.hash(data, 10);
export const compare = (data: string, hash: string): Promise<boolean> =>
  bc.compare(data, hash);
