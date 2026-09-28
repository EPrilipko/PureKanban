import { Injectable } from '@nestjs/common';
import { LexoRank } from 'lexorank';

@Injectable()
export class LexorankService {
  public generateRank(params: {
    prevRank?: string;
    nextRank?: string;
  }): string {
    const { prevRank, nextRank } = params;

    let rank: LexoRank;
    if (prevRank && nextRank) {
      rank = LexoRank.parse(prevRank).between(LexoRank.parse(nextRank));
    } else if (prevRank && !nextRank) {
      // Move to the end of list
      rank = LexoRank.parse(prevRank).genNext();
    } else if (!prevRank && nextRank) {
      // Move to the beginning of list
      rank = LexoRank.parse(nextRank).genPrev();
    } else {
      // Fallback (single item)
      rank = LexoRank.middle();
    }

    return rank.toString();
  }
}
