import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Omron B3G/B3G-S cutouts

export class SwitchOmronB3G extends CutoutGenerator {

    generate(key, generatorOptions) {

        // Cutout size = 13.5 x 13.5

        let upperLeft =  [new Decimal(-6.75).plus(generatorOptions.kerf).toNumber(), new Decimal(6.75).minus(generatorOptions.kerf).toNumber()]
        let upperRight = [new Decimal(6.75).minus(generatorOptions.kerf).toNumber(), new Decimal(6.75).minus(generatorOptions.kerf).toNumber()]
        let lowerLeft =  [new Decimal(-6.75).plus(generatorOptions.kerf).toNumber(), new Decimal(-6.75).plus(generatorOptions.kerf).toNumber()]
        let lowerRight = [new Decimal(6.75).minus(generatorOptions.kerf).toNumber(), new Decimal(-6.75).plus(generatorOptions.kerf).toNumber()]
        
        var model = {
            paths: {
                lineTop: new makerjs.paths.Line(upperLeft, upperRight),
                lineBottom: new makerjs.paths.Line(lowerLeft, lowerRight),
                lineLeft: new makerjs.paths.Line(upperLeft, lowerLeft),
                lineRight: new makerjs.paths.Line(upperRight, lowerRight)
            }
        }

        if (generatorOptions.switchFilletRadius.gt(0)) {

            const filletNum = generatorOptions.switchFilletRadius.toNumber() 

            var filletTopLeft = makerjs.path.fillet(model.paths.lineTop, model.paths.lineLeft, filletNum)
            var filletTopRight = makerjs.path.fillet(model.paths.lineTop, model.paths.lineRight, filletNum)
            var filletBottomLeft = makerjs.path.fillet(model.paths.lineBottom, model.paths.lineLeft, filletNum)
            var filletBottomRight = makerjs.path.fillet(model.paths.lineBottom, model.paths.lineRight, filletNum)
            
            model.paths.filletTopLeft = filletTopLeft;
            model.paths.filletTopRight = filletTopRight;
            model.paths.filletBottomLeft = filletBottomLeft;
            model.paths.filletBottomRight = filletBottomRight;

        }

        if (!key.skipOrientationFix && key.height > key.width) {
            model = makerjs.model.rotate(model, -90)
        } 
        
        return model;
    }
}