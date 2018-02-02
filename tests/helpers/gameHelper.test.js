import React from 'react';
import { expect } from 'chai';

// Helper
import * as gameHelper from '../../src/js/helpers/gameHelper';

describe('gameHelper Helper', () => {

  it('Waiting for Testing', () => {
    return true;
  });

  describe('reveal all mines', () => {
    let rows = [];
    beforeEach(() => {
      // [_,x]
      // [x,_]
      rows = [
          [
              {masked: true, count: 0, mine: false, marked: false},
              {masked: true, count: 0, mine: true, marked: false}
          ],[
              {masked: true, count: 0, mine: true, marked: false},
              {masked: true, count: 0, mine: false, marked: false}
          ],
      ];
    });

    it('should mark all mines after game is won', () => {
      let revealedRows = gameHelper.revealAllMines(rows);
      expect(revealedRows[0][0].marked).to.equal(false);
      expect(revealedRows[0][1].marked).to.equal(true);
      expect(revealedRows[1][0].marked).to.equal(true);
      expect(revealedRows[1][1].marked).to.equal(false);
    });

    it('should find masked empty cells', () => {
      expect(gameHelper.haveNonMineMasked(rows)).to.be.ok;
    });

  });

});
