import { multiply as multiplyTransform } from 'ol/transform';
import CanvasImmediateRenderer from 'ol/render/canvas/Immediate';
import * as olTransform from 'ol/transform';


function getVectorContext(event) {
    const frameState = event.frameState;
    console.log(multiplyTransform)
    const transform = multiplyTransform(event.inversePixelTransform.slice(), frameState.coordinateToPixelTransform);
    return new CanvasImmediateRenderer(
        event.context, frameState.pixelRatio, frameState.extent, transform,
        frameState.viewState.rotation
    );
}

export default getVectorContext