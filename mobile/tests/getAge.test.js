
const getAge = require('../functions/getAge')

test('properlay calculate age',() =>
{
    const birthday = new Date(2000,1,1)
    expect(getAge(birthday)).toBe(21)
})