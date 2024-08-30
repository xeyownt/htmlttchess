const { ChessBoard } = require('./html_tt_chess');

test('valid FEN string', () => {
  const fenCode = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  expect(new ChessBoard(fenCode,"","","","").parseFen()).toBe(true);
});

test('invalid FEN string with too many rows', () => {
  const fenCode = "rnbqkbnr/pppppppp/8/8/8/8/8/PPPPPPPP/RNBQKBNR";
  expect(new ChessBoard(fenCode,"","","","").parseFen()).toBe(false);
});

test('invalid FEN string with inconsistent column count', () => {
  const fenCode = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPP/RNBQKBNR";
  expect(new ChessBoard(fenCode,"","","","").parseFen()).toBe(false);
});

test('valid FEN string with expanded cells', () => {
  const fenCode = "rnbqkbnr/pppppppp/......../......../......../......../PPPPPPPP/RNBQKBNR";
  expect(new ChessBoard(fenCode,"","","","").parseFen()).toBe(true);
});

test('valid FEN string with extra fields', () => {
  fenCode = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w  KQkq - 0 1";
  expect(new ChessBoard(fenCode,"","","","").parseFen()).toBe(true);
  fenCode = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b  - - 0 1";
  expect(new ChessBoard(fenCode,"","","","").parseFen()).toBe(true);
  fenCode = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR  w  kq  e3  99   99 ";
  expect(new ChessBoard(fenCode,"","","","").parseFen()).toBe(true);
});
