/**
 * Typescript definition tests for d3/d3-polygon module
 *
 * Note: These tests are intended to test the definitions only
 * in the sense of typing and call signature consistency. They
 * are not intended as functional tests.
 */

import * as d3Polygon from '../../src/d3-polygon';

// -----------------------------------------------------------------------------
// Preparatory Steps
// -----------------------------------------------------------------------------

let num: number;
let containsFlag: boolean;
let point: [number, number] = [15, 15];
let polygon: Array<[number, number]> = [[10, 10], [20, 20], [10, 30]];
let pointArray: Array<[number, number]> = [[10, 10], [20, 20], [10, 30], [15, 15]];
let hull: Array<[number, number]>;

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

num = d3Polygon.polygonArea(polygon);

point = d3Polygon.polygonCentroid(polygon);

hull = d3Polygon.polygonHull(pointArray);

containsFlag = d3Polygon.polygonContains(polygon, point);

num = d3Polygon.polygonLength(polygon);
