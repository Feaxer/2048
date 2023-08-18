import { rotateMatrix, RotationDirection, slideRowRight, SlidingDirection, IBoard, solve2048Board } from "./utils"
import { describe, it, expect } from "vitest"

describe("rotateMatrix", () => {
    it("should rotate 3x3 matrix 90 degrees clockwise", () => {
        const matrix: number[][] = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]
        const expected: number[][] = [
            [7, 4, 1],
            [8, 5, 2],
            [9, 6, 3],
        ]
        expect(rotateMatrix(matrix, RotationDirection.Clockwise)).toEqual(expected)
    })

    it("should rotate 3x3 matrix 90 degrees counterclockwise", () => {
        const matrix: number[][] = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ]
        const expected: number[][] = [
            [3, 6, 9],
            [2, 5, 8],
            [1, 4, 7],
        ]
        expect(rotateMatrix(matrix, RotationDirection.Counterclockwise)).toEqual(expected)
    })

    it("should rotate 4x4 matrix 90 degrees clockwise", () => {
        const matrix: number[][] = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ]
        const expected: number[][] = [
            [13, 9, 5, 1],
            [14, 10, 6, 2],
            [15, 11, 7, 3],
            [16, 12, 8, 4],
        ]
        expect(rotateMatrix(matrix, RotationDirection.Clockwise)).toEqual(expected)
    })

    it("should rotate 4x4 matrix 90 degrees counterclockwise", () => {
        const matrix: number[][] = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16],
        ]
        const expected: number[][] = [
            [4, 8, 12, 16],
            [3, 7, 11, 15],
            [2, 6, 10, 14],
            [1, 5, 9, 13],
        ]
        expect(rotateMatrix(matrix, RotationDirection.Counterclockwise)).toEqual(expected)
    })
})

describe("slideRowRight", () => {
    it("should slide row to the right and merge adjacent tiles with the same value", () => {
        const row1: number[] = [0, 2, 4, 4]
        const expected1: number[] = [0, 0, 2, 8]
        expect(slideRowRight(row1)).toEqual(expected1)

        const row2: number[] = [2, 2, 4, 8]
        const expected2: number[] = [0, 0, 0, 16]
        expect(slideRowRight(row2)).toEqual(expected2)

        const row3: number[] = [2, 0, 2, 0]
        const expected3: number[] = [0, 0, 0, 4]
        expect(slideRowRight(row3)).toEqual(expected3)

        const row4: number[] = [0, 4, 0, 2]
        const expected4: number[] = [0, 0, 4, 2]
        expect(slideRowRight(row4)).toEqual(expected4)
    })

    it("should not modify the row if it is already slid to the right", () => {
        const row: number[] = [2, 4, 8, 16]
        const expected: number[] = [2, 4, 8, 16]
        expect(slideRowRight(row)).toEqual(expected)
    })

    it("should slide row with all zeros to the right", () => {
        const row: number[] = [0, 0, 0, 0]
        const expected: number[] = [0, 0, 0, 0]
        expect(slideRowRight(row)).toEqual(expected)
    })
})

describe("solve2048Board", () => {
    it("should solve the 2048 board sliding in the UP direction", () => {
        const board: IBoard = [
            [2, 4, 4],
            [0, 0, 0],
            [0, 0, 0],
        ]
        const expected: IBoard = [
            [2, 4, 4],
            [0, 0, 0],
            [0, 0, 0],
        ]
        expect(solve2048Board(board, SlidingDirection.UP)).toEqual(expected)
    })

    it("should solve the 2048 board sliding in the DOWN direction", () => {
        const board: IBoard = [
            [2, 4, 4],
            [0, 0, 0],
            [0, 0, 0],
        ]
        const expected: IBoard = [
            [0, 0, 0],
            [0, 0, 0],
            [2, 4, 4],
        ]
        expect(solve2048Board(board, SlidingDirection.DOWN)).toEqual(expected)
    })

    it("should solve the 2048 board sliding in the LEFT direction", () => {
        const board: IBoard = [
            [2, 4, 4],
            [0, 0, 0],
            [0, 0, 0],
        ]
        const expected: IBoard = [
            [2, 8, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]
        expect(solve2048Board(board, SlidingDirection.LEFT)).toEqual(expected)
    })

    it("should solve the 2048 board sliding in the RIGHT direction", () => {
        const board: IBoard = [
            [2, 4, 4],
            [0, 0, 0],
            [0, 0, 0],
        ]
        const expected: IBoard = [
            [0, 2, 8],
            [0, 0, 0],
            [0, 0, 0],
        ]
        expect(solve2048Board(board, SlidingDirection.RIGHT)).toEqual(expected)
    })

    it("should log 'Invalid direction' for an invalid direction", () => {
        const board: IBoard = [
            [2, 4, 4],
            [0, 0, 0],
            [0, 0, 0],
        ]
        // @ts-ignore
        expect(solve2048Board(board, 5)).toEqual(board)
    })
})
