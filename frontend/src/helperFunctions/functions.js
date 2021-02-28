export function calculateDuration(arr) {
    let totalDuration = 0
    for(let i = 0; i < arr.length; i++){
        totalDuration += arr[i].duration;
    }
    return totalDuration
}