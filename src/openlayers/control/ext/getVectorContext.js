import { multiply as multiplyTransform } from 'ol/transform';
import CanvasImmediateRenderer from 'ol/render/canvas/Immediate';

function getVectorContext(event) {
    const frameState = event.frameState;
    const transform = multiplyTransform(event.inversePixelTransform.slice(), frameState.coordinateToPixelTransform);
    return new CanvasImmediateRenderer(
        event.context, frameState.pixelRatio, frameState.extent, transform,
        frameState.viewState.rotation
    );
}

export default getVectorContext