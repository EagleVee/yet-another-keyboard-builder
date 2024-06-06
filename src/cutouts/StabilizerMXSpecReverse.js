import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Specdoc-based Cherry MX stabilizer cutout

export class StabilizerMXSpecReverse extends CutoutGenerator {

    generate(key, generatorOptions) {

        let keySize = key.width

        if (!key.skipOrientationFix && key.height > key.width) {
            keySize = key.height
        }

        let stab_spacing_left = null
        let stab_spacing_right = null

        if (keySize.gte(8)) {
            stab_spacing_left = stab_spacing_right = new Decimal("66.675")
        }
        else if (keySize.gte(7)) {
            stab_spacing_left = stab_spacing_right = new Decimal("57.15")
        }
        else if (keySize.gte(6.25)) {
            stab_spacing_left = stab_spacing_right = new Decimal("50")
        }
        else if (keySize.gte(6)) {
            if (key.shift6UStabilizers) {
                stab_spacing_left = new Decimal("57.15")
                stab_spacing_right = new Decimal("38.1")
            } else {
                stab_spacing_left = stab_spacing_right = new Decimal("47.625")
            }
        }
        else if (keySize.gte(3)) {
            stab_spacing_left = stab_spacing_right = new Decimal("19.05")
        }
        else if (keySize.gte(2)) {
            stab_spacing_left = stab_spacing_right = new Decimal("11.938")
        }
        else {
            return null
        }

        // Create the left side cutout first

        const pointA = [new Decimal("-3.3274").plus(generatorOptions.kerf).toNumber(), new Decimal("-5.6896").plus(generatorOptions.kerf).toNumber()]
        const pointB = [new Decimal("3.3274").minus(generatorOptions.kerf).toNumber(), new Decimal("-5.6896").plus(generatorOptions.kerf).toNumber()]
        const pointC = [new Decimal("3.3274").minus(generatorOptions.kerf).toNumber(), new Decimal("6.604").minus(generatorOptions.kerf).toNumber()]
        const pointD = [new Decimal("1.524").minus(generatorOptions.kerf).toNumber(), new Decimal("6.604").minus(generatorOptions.kerf).toNumber()]
        const pointE = [new Decimal("1.524").minus(generatorOptions.kerf).toNumber(), new Decimal("7.7724").minus(generatorOptions.kerf).toNumber()]
        const pointF = [new Decimal("-1.524").plus(generatorOptions.kerf).toNumber(), new Decimal("7.7724").minus(generatorOptions.kerf).toNumber()]
        const pointG = [new Decimal("-1.524").plus(generatorOptions.kerf).toNumber(), new Decimal("6.604").minus(generatorOptions.kerf).toNumber()]
        const pointH = [new Decimal("-3.3274").plus(generatorOptions.kerf).toNumber(), new Decimal("6.604").minus(generatorOptions.kerf).toNumber()]
        const pointI = [new Decimal("-3.3274").plus(generatorOptions.kerf).toNumber(), new Decimal("0.508").minus(generatorOptions.kerf).toNumber()]
        const pointJ = [new Decimal("-4.191").plus(generatorOptions.kerf).toNumber(), new Decimal("0.508").minus(generatorOptions.kerf).toNumber()]
        const pointK = [new Decimal("-4.191").plus(generatorOptions.kerf).toNumber(), new Decimal("-2.286").plus(generatorOptions.kerf).toNumber()]
        const pointL = [new Decimal("-3.3274").plus(generatorOptions.kerf).toNumber(), new Decimal("-2.286").plus(generatorOptions.kerf).toNumber()]

        // Reversed "entry point" for the bar horizontal cutout bit
        let pointW, pointXL, pointXR, pointYL, pointYR, pointZ;

        if (keySize.gte(3)) {
            pointW = [new Decimal("3.3274").minus(generatorOptions.kerf).toNumber(), new Decimal("-2.3").plus(generatorOptions.kerf).toNumber()]
            pointZ = [new Decimal("3.3274").minus(generatorOptions.kerf).toNumber(), new Decimal("2.3").minus(generatorOptions.kerf).toNumber()]

            pointXL = [new Decimal(stab_spacing_left).toNumber(), new Decimal("-2.3").plus(generatorOptions.kerf).toNumber()]
            pointXR = [new Decimal(stab_spacing_right).toNumber(), new Decimal("-2.3").plus(generatorOptions.kerf).toNumber()]
            pointYL = [new Decimal(stab_spacing_left).toNumber(), new Decimal("2.3").minus(generatorOptions.kerf).toNumber()]
            pointYR = [new Decimal(stab_spacing_right).toNumber(), new Decimal("2.3").minus(generatorOptions.kerf).toNumber()]
        } else {
            pointW = [new Decimal("3.3274").minus(generatorOptions.kerf).toNumber(), new Decimal("-4.8768").plus(generatorOptions.kerf).toNumber()]
            pointZ = [new Decimal("3.3274").minus(generatorOptions.kerf).toNumber(), new Decimal("5.8166").minus(generatorOptions.kerf).toNumber()]

            pointXL = [new Decimal(stab_spacing_left).toNumber(), new Decimal("-4.8768").plus(generatorOptions.kerf).toNumber()]
            pointXR = [new Decimal(stab_spacing_right).toNumber(), new Decimal("-4.8768").plus(generatorOptions.kerf).toNumber()]
            pointYL = [new Decimal(stab_spacing_left).toNumber(), new Decimal("5.8166").minus(generatorOptions.kerf).toNumber()]
            pointYR = [new Decimal(stab_spacing_right).toNumber(), new Decimal("5.8166").minus(generatorOptions.kerf).toNumber()]
        }

        const singleCutout = {
            paths: {
                line1: new makerjs.paths.Line(pointA, pointB),
                line2a: new makerjs.paths.Line(pointB, pointW),
                line2b: new makerjs.paths.Line(pointW, pointXL),
                line2c: new makerjs.paths.Line(pointYL, pointZ),
                line2d: new makerjs.paths.Line(pointZ, pointC),
                line3: new makerjs.paths.Line(pointC, pointD),
                line4: new makerjs.paths.Line(pointD, pointE),
                line5: new makerjs.paths.Line(pointE, pointF),
                line6: new makerjs.paths.Line(pointF, pointG),
                line7: new makerjs.paths.Line(pointG, pointH),
                line8: new makerjs.paths.Line(pointH, pointI),
                line9: new makerjs.paths.Line(pointI, pointJ),
                line10: new makerjs.paths.Line(pointJ, pointK),
                line11: new makerjs.paths.Line(pointK, pointL),
                line12: new makerjs.paths.Line(pointL, pointA)
            }
        }

        let cutoutLeft = singleCutout;
        const cutoutRightTemp = makerjs.model.clone(singleCutout)
        cutoutRightTemp.paths.line2b = new makerjs.paths.Line(pointW, pointXR)
        cutoutRightTemp.paths.line2c = new makerjs.paths.Line(pointYR, pointZ)
        let cutoutRight = makerjs.model.mirror(cutoutRightTemp, true, false);

        if (generatorOptions.stabilizerFilletRadius.gt(0)) {
            const filletNum = generatorOptions.stabilizerFilletRadius.toNumber()

            for (let currCutout of [cutoutLeft, cutoutRight]) {
                const fillet1 = makerjs.path.fillet(currCutout.paths.line1, currCutout.paths.line2a, filletNum);
                const fillet1a = makerjs.path.fillet(currCutout.paths.line2a, currCutout.paths.line2b, filletNum);
                const fillet1b = makerjs.path.fillet(currCutout.paths.line2c, currCutout.paths.line2d, filletNum);
                const fillet2 = makerjs.path.fillet(currCutout.paths.line2d, currCutout.paths.line3, filletNum);
                const fillet3 = makerjs.path.fillet(currCutout.paths.line3, currCutout.paths.line4, filletNum);
                const fillet4 = makerjs.path.fillet(currCutout.paths.line4, currCutout.paths.line5, filletNum);
                const fillet5 = makerjs.path.fillet(currCutout.paths.line5, currCutout.paths.line6, filletNum);
                const fillet6 = makerjs.path.fillet(currCutout.paths.line6, currCutout.paths.line7, filletNum);
                const fillet7 = makerjs.path.fillet(currCutout.paths.line7, currCutout.paths.line8, filletNum);
                const fillet8 = makerjs.path.fillet(currCutout.paths.line8, currCutout.paths.line9, filletNum);
                const fillet9 = makerjs.path.fillet(currCutout.paths.line9, currCutout.paths.line10, filletNum);
                const fillet10 = makerjs.path.fillet(currCutout.paths.line10, currCutout.paths.line11, filletNum);
                const fillet11 = makerjs.path.fillet(currCutout.paths.line11, currCutout.paths.line12, filletNum);
                const fillet12 = makerjs.path.fillet(currCutout.paths.line12, currCutout.paths.line1, filletNum);

                currCutout.paths.fillet1 = fillet1;
                currCutout.paths.fillet1a = fillet1a;
                currCutout.paths.fillet1b = fillet1b;
                currCutout.paths.fillet2 = fillet2;
                currCutout.paths.fillet3 = fillet3;
                currCutout.paths.fillet4 = fillet4;
                currCutout.paths.fillet5 = fillet5;
                currCutout.paths.fillet6 = fillet6;
                currCutout.paths.fillet7 = fillet7;
                currCutout.paths.fillet8 = fillet8;
                currCutout.paths.fillet9 = fillet9;
                currCutout.paths.fillet10 = fillet10;
                currCutout.paths.fillet11 = fillet11;
                currCutout.paths.fillet12 = fillet12;
            }
        }


        cutoutLeft = makerjs.model.move(cutoutLeft, [stab_spacing_left.times(-1).toNumber(), 0])
        cutoutRight = makerjs.model.move(cutoutRight, [stab_spacing_right.toNumber(), 0])

        let cutouts = {
            models: {
                "left": cutoutLeft,
                "right": cutoutRight
            }
        }

        if (!key.skipOrientationFix && key.height > key.width) {
            cutouts = makerjs.model.rotate(cutouts, -90)
        }

        return cutouts;
    }
}
