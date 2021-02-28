const formatVolumeIconPath = require('../assets/scripts/main.js') //imports main.js
describe("formatVolumeIconPath", () => {
    test("tests volumes over 66 for icon 3", () => {
        expect(formatVolumeIconPath(100)).toMatch('3');
    });
    
    test("tests volumes <67 and >33 for icon 2", () => {
        expect(formatVolumeIconPath(50)).toMatch('2');
    });

    test("tests volumes <34 and >0 for icon 1", () => {
        expect(formatVolumeIconPath(25)).toMatch('1');
    });

    test("tests volumes equal to 0 for icon 0", () => {
        expect(formatVolumeIconPath(0)).toMatch('0');
    })

})