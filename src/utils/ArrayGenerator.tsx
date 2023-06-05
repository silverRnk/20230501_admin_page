
export function EmptyArrayGenerator(count: number): Array<any> {
    let array = []
    
    for(let i = 0; i<count; i++){
        array.push('')
    }

    return array
}