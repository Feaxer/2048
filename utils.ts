export enum RotationDirection {
    Clockwise = "clockwise",
    Counterclockwise = "counterclockwise",
}

export type IBoard = number[][]
export enum SlidingDirection {
    UP,
    DOWN,
    RIGHT,
    LEFT,
}

export function rotateMatrix(matrix: number[][], direction: RotationDirection): number[][] {
    const n = matrix.length
    const rotatedMatrix: number[][] = Array.from(Array(n), () => Array(n))

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (direction === RotationDirection.Clockwise) {
                rotatedMatrix[j][n - 1 - i] = matrix[i][j]
            } else if (direction === RotationDirection.Counterclockwise) {
                rotatedMatrix[n - 1 - j][i] = matrix[i][j]
            }
        }
    }

    return rotatedMatrix
}

// Function to print matrix
export function printMatrix(matrix: number[][]): void {
    for (let i = 0; i < matrix.length; i++) {
        let row = ""
        for (let j = 0; j < matrix[i].length; j++) {
            row += matrix[i][j] + " "
        }
        console.log(row)
    }
}

export function slideRowRight(row: number[]): number[] {
    const result: number[] = Array(row.length).fill(0)
    let mergedIndex = 0

    // Iterate through the input row and merge adjacent tiles with the same value
    for (let i = 0; i < row.length; i++) {
        const currentValue = row[i]

        if (currentValue !== 0) {
            if (mergedIndex > 0 && result[mergedIndex - 1] === currentValue) {
                // Merge with the previous tile
                result[mergedIndex - 1] *= 2
            } else {
                // Move the tile to the right
                result[mergedIndex] = currentValue
                mergedIndex++
            }
        }
    }

    // Move non-zero elements to the end of the list
    return [...Array(row.length - mergedIndex).fill(0), ...result.slice(0, mergedIndex)]
}

export function solve2048Board(board: IBoard, direction: SlidingDirection): IBoard {
    let result: IBoard = board

    switch (direction) {
        case SlidingDirection.DOWN:
            result = rotateMatrix(board, RotationDirection.Counterclockwise)
            result = result.map((row) => slideRowRight(row))
            result = rotateMatrix(result, RotationDirection.Clockwise)
            break
        case SlidingDirection.UP:
            result = rotateMatrix(board, RotationDirection.Clockwise)
            result = result.map((row) => slideRowRight(row))
            result = rotateMatrix(result, RotationDirection.Counterclockwise)
            break
        case SlidingDirection.RIGHT:
            result = board.map((row) => slideRowRight(row))
            break
        case SlidingDirection.LEFT:
            result = board.map((row) => slideRowRight(row.reverse()).reverse())
            break
        default:
            result = board
    }

    return result
}
