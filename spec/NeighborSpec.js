window.width = 3;
window.height = 3;

describe("neighbors", function() {

  beforeEach(function() {
  });

  describe("find", function () {
      it("should find neighbors for 0", function() {
          var list = getNeighbors(0);
          expect(list).toEqual([1, 3, 4]);
      });

      it("should find neighbors for 1", function() {
          var list = getNeighbors(1);
          expect(list).toEqual([0, 2, 3, 4, 5]);
      });

      it("should find neighbors for 2", function() {
          var list = getNeighbors(2);
          expect(list).toEqual([1, 4, 5]);
      });

      it("should find neighbors for 3", function() {
          var list = getNeighbors(3);
          expect(list).toEqual([0, 1, 4, 6, 7]);
      });

      it("should find neighbors for 4", function() {
          var list = getNeighbors(4);
          expect(list).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);
      });

      it("should find neighbors for 5", function() {
          var list = getNeighbors(5);
          expect(list).toEqual([1, 2, 4, 7, 8]);
      });

      it("should find neighbors for 6", function() {
          var list = getNeighbors(6);
          expect(list).toEqual([3, 4, 7]);
      });

      it("should find neighbors for 7", function() {
          var list = getNeighbors(7);
          expect(list).toEqual([3, 4, 5, 6, 8]);
      });

      it("should find neighbors for 8", function() {
          var list = getNeighbors(8);
          expect(list).toEqual([4, 5, 7]);
      });
  })

  describe("enough neighbors", function () {
      beforeEach(function() {
          window.board = new Array(width * height)
      });
      it("shoud determine zero neighbors", function () {
          expect(enoughAlive(0)).toBeFalsy()
          expect(enoughAlive(1)).toBeFalsy()
          expect(enoughAlive(2)).toBeFalsy()
          expect(enoughAlive(3)).toBeFalsy()
          expect(enoughAlive(4)).toBeFalsy()
          expect(enoughAlive(5)).toBeFalsy()
          expect(enoughAlive(6)).toBeFalsy()
          expect(enoughAlive(7)).toBeFalsy()
          expect(enoughAlive(8)).toBeFalsy()
      })

      it("shoud determine one neighbors", function () {
          board[0] = "alive";
          expect(enoughAlive(0)).toBeFalsy()
          expect(enoughAlive(1)).toBeFalsy()
          expect(enoughAlive(2)).toBeFalsy()
          expect(enoughAlive(3)).toBeFalsy()
          expect(enoughAlive(4)).toBeFalsy()
          expect(enoughAlive(5)).toBeFalsy()
          expect(enoughAlive(6)).toBeFalsy()
          expect(enoughAlive(7)).toBeFalsy()
          expect(enoughAlive(8)).toBeFalsy()
      })

      it("shoud determine two neighbors", function () {
          board[0] = "alive";
          board[4] = "alive";
          expect(enoughAlive(0)).toBeFalsy()
          expect(enoughAlive(1)).toBeTruthy()
          expect(enoughAlive(2)).toBeFalsy()
          expect(enoughAlive(3)).toBeTruthy()
          expect(enoughAlive(4)).toBeFalsy()
          expect(enoughAlive(5)).toBeFalsy()
          expect(enoughAlive(6)).toBeFalsy()
          expect(enoughAlive(7)).toBeFalsy()
          expect(enoughAlive(8)).toBeFalsy()
      })

      it("shoud determine three neighbors", function () {
          board[0] = "alive";
          board[2] = "alive";
          board[4] = "alive";
          expect(enoughAlive(0)).toBeFalsy()
          expect(enoughAlive(1)).toBeTruthy()
          expect(enoughAlive(2)).toBeFalsy()
          expect(enoughAlive(3)).toBeTruthy()
          expect(enoughAlive(4)).toBeTruthy()
          expect(enoughAlive(5)).toBeTruthy()
          expect(enoughAlive(6)).toBeFalsy()
          expect(enoughAlive(7)).toBeFalsy()
          expect(enoughAlive(8)).toBeFalsy()
      })

      it("shoud determine four neighbors", function () {
          board[0] = "alive";
          board[1] = "alive";
          board[2] = "alive";
          board[3] = "alive";
          expect(enoughAlive(0)).toBeTruthy()
          expect(enoughAlive(1)).toBeTruthy()
          expect(enoughAlive(2)).toBeFalsy()
          expect(enoughAlive(3)).toBeTruthy()
          expect(enoughAlive(4)).toBeFalsy()
          expect(enoughAlive(5)).toBeTruthy()
          expect(enoughAlive(6)).toBeFalsy()
          expect(enoughAlive(7)).toBeFalsy()
          expect(enoughAlive(8)).toBeFalsy()
      })

      it("shoud determine four dying neighbors", function () {
          board[0] = "dying";
          board[1] = "dying";
          board[2] = "dying";
          board[3] = "dying";
          expect(enoughAlive(0)).toBeFalsy()
          expect(enoughAlive(1)).toBeFalsy()
          expect(enoughAlive(2)).toBeFalsy()
          expect(enoughAlive(3)).toBeFalsy()
          expect(enoughAlive(4)).toBeFalsy()
          expect(enoughAlive(5)).toBeFalsy()
          expect(enoughAlive(6)).toBeFalsy()
          expect(enoughAlive(7)).toBeFalsy()
          expect(enoughAlive(8)).toBeFalsy()
      })
  })
  describe("take step", function () {
      beforeEach(function() {
          window.board = new Array(width * height)
      });

      it("should handle an empty board", function () {
          takeStep();
          expect(new Array(width * height)).toEqual(board)
      })

      it("should handle a board with one element", function () {
          board[4] = "alive"
          takeStep()
          var expectedArray = new Array(width * height)
          expectedArray[4] = "dying"
          expect(expectedArray).toEqual(board)

          takeStep()
          var expectedArray = new Array(width * height)
          expectedArray[4] = "dead"
          expect(expectedArray).toEqual(board)
      })

      it("should handle a board with two elements", function () {
          board[0] = "alive"
          board[4] = "alive"
          takeStep()
          var expectedArray = new Array(width * height)
          expectedArray[4] = "dying"
          expectedArray[0] = "dying"
          expectedArray[1] = "alive"
          expectedArray[3] = "alive"
          expect(expectedArray).toEqual(board)

          takeStep()
          var expectedArray = new Array(width * height)
          expectedArray[1] = "dying"
          expectedArray[3] = "dying"
          expectedArray[0] = "alive"
          expectedArray[4] = "alive"
          expect(expectedArray).toEqual(board)
      })

      it("should handle a game", function () {
          board[0] = "alive"
          board[2] = "alive"
          board[4] = "alive"
          takeStep()
          var expectedArray = new Array(width * height)
          expectedArray[1] = "alive"
          expectedArray[3] = "alive"
          expectedArray[4] = "alive"
          expectedArray[5] = "alive"
          expectedArray[0] = "dying"
          expectedArray[2] = "dying"
          expect(expectedArray).toEqual(board)

          takeStep()
          var expectedArray = new Array(width * height)
          expectedArray[0] = "alive"
          expectedArray[1] = "alive"
          expectedArray[2] = "alive"
          expectedArray[3] = "alive"
          expectedArray[4] = "alive"
          expectedArray[5] = "alive"
          expectedArray[6] = "alive"
          expectedArray[7] = "alive"
          expectedArray[8] = "alive"
          expect(expectedArray).toEqual(board)

          takeStep()
          var expectedArray = new Array(width * height)
          expectedArray[0] = "alive"
          expectedArray[1] = "dying"
          expectedArray[2] = "alive"
          expectedArray[3] = "dying"
          expectedArray[4] = "dying"
          expectedArray[5] = "dying"
          expectedArray[6] = "alive"
          expectedArray[7] = "dying"
          expectedArray[8] = "alive"
          expect(expectedArray).toEqual(board)

          takeStep()
          var expectedArray = new Array(width * height)
          expectedArray[0] = "dying"
          expectedArray[1] = "alive"
          expectedArray[2] = "dying"
          expectedArray[3] = "alive"
          expectedArray[4] = "dead"
          expectedArray[5] = "alive"
          expectedArray[6] = "dying"
          expectedArray[7] = "alive"
          expectedArray[8] = "dying"
          expect(expectedArray).toEqual(board)
      })
  });
});
