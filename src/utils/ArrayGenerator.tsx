
/**
 * Generate an array with length of n and has a fill value
 * @param count - length of array
 * @param fill - fill value for each element ex. fill = 1 returns [1, 1, 1]
 * @returns Creates an array with an length of count
 */
export function EmptyArrayGenerator(count: number, fill: any = ''): Array<any> {
    let array = []
    
    for(let i = 0; i<count; i++){
        array.push(fill)
    }

    return array
}