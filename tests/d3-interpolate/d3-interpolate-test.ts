/**
 * Typescript definition tests for d3/d3-interpolate module
 *
 * Note: These tests are intended to test the definitions only
 * in the sense of typing and call signature consistency. They
 * are not intended as functional tests.
 */

import * as d3Color from '../../src/d3-color';
import * as d3Interpolate from '../../src/d3-interpolate';
import * as d3Hsv from '../../src/d3-hsv';

// Preparatory steps -------------------------------------------------------------------

interface Interpolator<T> {
    (t: number): T;
}

class NumCoercible {
    public a: number;

    constructor(a: number) {
        this.a = a;
    }
    public valueOf() {
        return this.a;
    }
}

class StringCoercible {
    public a: string;

    constructor(a: string) {
        this.a = a;
    }

    public toString() {
        return this.a;
    }
}


let iNum: Interpolator<number>,
    iString: Interpolator<string>,
    iDate: Interpolator<Date>,
    iArrayNum: Interpolator<Array<number>>,
    iArrayStr: Interpolator<Array<string>>,
    iArrayDate: Interpolator<Array<Date>>,
    iArrayMixed: Interpolator<[Date, string]>,
    iKeyVal: Interpolator<{ [key: string]: any }>,
    iRGBColorObj: Interpolator<d3Color.RGBColor>,
    iZoom: d3Interpolate.ZoomInterpolator;

let num: number,
    str: string,
    arrNum: number[],
    arrStr: string[],
    objKeyVal: { [key: string]: any },
    objRGBColor: d3Color.RGBColor,
    objHSVColor: d3Hsv.HSVColor,
    zoom: [number, number, number];

// test interpolate(a, b) signature ----------------------------------------------------

iNum = d3Interpolate.interpolate('1', 5);


// color interpolator returning a color string
iString = d3Interpolate.interpolate('seagreen', d3Color.rgb(100, 100, 100));
iString = d3Interpolate.interpolate('seagreen', d3Hsv.hsv(60, 1, 0.2, 0.4));
iString = d3Interpolate.interpolate('seagreen', 'steelblue'); // as used with valid color name string

// date interpolator
iDate = d3Interpolate.interpolate(new Date(2016, 6, 1), new Date(2016, 6, 31));

// regular string interpolator interpolating number strings (as the strings are not valid color strings)
iString = d3Interpolate.interpolate(1, '5');
iString = d3Interpolate.interpolate('a: 1', 'a: 5');
iString = d3Interpolate.interpolate(new StringCoercible('a: 1'), 'a: 5');

iArrayNum = d3Interpolate.interpolate(['1', '2'], [4, 8]);
iArrayStr = d3Interpolate.interpolate(['1', '2'], ['4', '8']);
// two element array with first element date and second element string
iArrayMixed = d3Interpolate.interpolate<[Date, string]>([new Date(2016, 6, 1), 'b: 2'], [new Date(2016, 6, 31), 'b: 8']);

// Coercible to number

iNum = d3Interpolate.interpolate(12, new NumCoercible(20));
iNum = d3Interpolate.interpolate(new NumCoercible(2), new NumCoercible(20));

// Key Value

iKeyVal = d3Interpolate.interpolate({ x: 0, y: 1 }, { x: 1, y: 10, z: 100 });

d3Interpolate.interpolate<NumCoercible>(new NumCoercible(1), new NumCoercible(5));
d3Interpolate.interpolate<NumCoercible>({ a: 1 }, new NumCoercible(5));

// test interpolateNumber(a, b) signature ----------------------------------------------------

iNum = d3Interpolate.interpolateNumber(0, 100);
iNum = d3Interpolate.interpolateNumber(new NumCoercible(0), new NumCoercible(100));
num = iNum(0.5);

// test interpolateNumber(a, b) signature ----------------------------------------------------

iNum = d3Interpolate.interpolateRound(0, 100);
iNum = d3Interpolate.interpolateRound(new NumCoercible(0), new NumCoercible(100));
num = iNum(0.5);

// test interpolateString(a, b) signature ----------------------------------------------------

iString = d3Interpolate.interpolateString('-1', '2');
str = iString(0.5);

// test interpolateDate(a, b) signature ----------------------------------------------------

iDate = d3Interpolate.interpolateDate(new Date(2016, 6, 1), new Date(2016, 6, 31));

// test interpolateArray(a, b) signature ----------------------------------------------------

iArrayNum = d3Interpolate.interpolateArray<Array<number>>([1, 2], [4, 8]); // explicit typing
arrNum = iArrayNum(0.5);

iArrayNum = d3Interpolate.interpolateArray<[number, number]>(['1', '2'], [4, 8]); // explicit typing
arrNum = iArrayNum(0.5);

iArrayStr = d3Interpolate.interpolateArray<Array<string>>(['1', '2'], ['4', '8']); // explicit typing
arrStr = iArrayStr(0.5);

iArrayStr = d3Interpolate.interpolateArray([1, 2], ['4', '8']); // infered typing <string>
arrStr = iArrayStr(0.5);

// two element array with first element date and second element string
iArrayMixed = d3Interpolate.interpolateArray<[Date, string]>([new Date(2016, 6, 1), 'b: 1'], [new Date(2016, 6, 31), 'b: 8']);

// test interpolateObject(a, b) signature ----------------------------------------------------

iKeyVal = d3Interpolate.interpolateObject({ x: 0, y: 1 }, { x: 1, y: 10, z: 100 });
objKeyVal = iKeyVal(0.5);

iRGBColorObj = d3Interpolate.interpolateObject<d3Color.RGBColor>(d3Color.rgb('steelblue'), d3Color.rgb('seagreen'));
objRGBColor = iRGBColorObj(0.5);

// test interpolateTransformCss(a, b) signature ----------------------------------------------------

iString = d3Interpolate.interpolateTransformCss('rotate(0deg)', 'rotate(60deg)');
str = iString(0.5);

// test interpolateTransformSvg(a, b) signature ----------------------------------------------------

iString = d3Interpolate.interpolateTransformSvg('rotate(0)', 'rotate(60)');
str = iString(0.5);


// test interpolateZoom(a, b) signature ----------------------------------------------------

iZoom = d3Interpolate.interpolateZoom([50, 50, 300], [100, 100, 500]);
zoom = iZoom(0.5);

console.log('Recommended transition duration = %d', iZoom.duration);

// test quantize(interpolator, n) signature ------------------------------------------------

arrNum = d3Interpolate.quantize(d3Interpolate.interpolateRound(-1, 2), 4); // infered template parameter type
arrStr = d3Interpolate.quantize<string>(d3Interpolate.interpolateString('-1', '2'), 4); // explicit template parameter typing

// arrStr = d3Interpolate.quantize<string>(d3Interpolate.interpolateRound(-1, 2), 4); // test fails, due to explicit typing v argument type mismatch

// test interpolateRgb(a, b) signatures ----------------------------------------------------------------

// without gamma correction
iString = d3Interpolate.interpolateRgb('seagreen', 'steelblue');
iString = d3Interpolate.interpolateRgb(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
iString = d3Interpolate.interpolateRgb(d3Color.rgb('seagreen'), d3Hsv.hsv('steelblue'));
str = iString(0.5);

// with gamma correction
iString = d3Interpolate.interpolateRgb.gamma(2.2)('purple', 'orange');

// test interpolateRgbBasis(color) and  interpolateRgbBasisClosed(color) signatures -------------------------

iString = d3Interpolate.interpolateRgbBasis(['seagreen', d3Color.rgb('steelblue'), 'rgb(100, 100, 100)']);
iString = d3Interpolate.interpolateRgbBasis(['seagreen', d3Hsv.hsv('steelblue'), 'rgb(100, 100, 100)']);
iString = d3Interpolate.interpolateRgbBasisClosed(['seagreen', d3Hsv.hsv('steelblue'), 'rgb(100, 100, 100)']);

// test interpolateHsl(a, b) and interpolateHslLong(a, b)----------------------------------------------------------------

iString = d3Interpolate.interpolateHsl('seagreen', 'steelblue');
iString = d3Interpolate.interpolateHsl(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
iString = d3Interpolate.interpolateHsl(d3Color.rgb('seagreen'), d3Hsv.hsv('steelblue'));

iString = d3Interpolate.interpolateHslLong('seagreen', 'steelblue');
iString = d3Interpolate.interpolateHslLong(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
iString = d3Interpolate.interpolateHslLong(d3Color.rgb('seagreen'), d3Hsv.hsv('steelblue'));

// test interpolateLab(a, b) --------------------------------------------------------------------------------------------

iString = d3Interpolate.interpolateLab('seagreen', 'steelblue');
iString = d3Interpolate.interpolateLab(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
iString = d3Interpolate.interpolateLab(d3Color.rgb('seagreen'), d3Hsv.hsv('steelblue'));

// test interpolateHcl(a, b) and interpolateHclLong(a, b) ----------------------------------------------------------------

iString = d3Interpolate.interpolateHcl('seagreen', 'steelblue');
iString = d3Interpolate.interpolateHcl(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
iString = d3Interpolate.interpolateHcl(d3Color.rgb('seagreen'), d3Hsv.hsv('steelblue'));

iString = d3Interpolate.interpolateHclLong('seagreen', 'steelblue');
iString = d3Interpolate.interpolateHclLong(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
iString = d3Interpolate.interpolateHclLong(d3Color.rgb('seagreen'), d3Hsv.hsv('steelblue'));

// test interpolateCubehelix(a, b) and interpolateCubehelixLong(a, b) ---------------------------------------------------

// without gamma correction
iString = d3Interpolate.interpolateCubehelix('seagreen', 'steelblue');
iString = d3Interpolate.interpolateCubehelix(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
iString = d3Interpolate.interpolateCubehelix(d3Color.rgb('seagreen'), d3Hsv.hsv('steelblue'));
str = iString(0.5);

// with gamma correction
iString = d3Interpolate.interpolateCubehelix.gamma(2.2)('purple', 'orange');

// without gamma correction
iString = d3Interpolate.interpolateCubehelixLong('seagreen', 'steelblue');
iString = d3Interpolate.interpolateCubehelixLong(d3Color.rgb('seagreen'), d3Color.hcl('steelblue'));
iString = d3Interpolate.interpolateCubehelixLong(d3Color.rgb('seagreen'), d3Hsv.hsv('steelblue'));
str = iString(0.5);

// with gamma correction
iString = d3Interpolate.interpolateCubehelixLong.gamma(2.2)('purple', 'orange');



// test interpolateBasis(splineNodes) and interpolateBasisClosed(splineNodes: Array<number>) ----------------------------

iNum = d3Interpolate.interpolateBasis([1, 50, 30, 10]);

iNum = d3Interpolate.interpolateBasisClosed([1, 50, 30, 10]);
