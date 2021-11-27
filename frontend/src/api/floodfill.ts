type Color = [number, number, number, number];

function hexToRGB(hex: string): Color {
    const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b, 255]
}

function getColorDistance(color: Color, targetColor: Color): number {
    const R = color[0] - targetColor[0];
    const G = color[1] - targetColor[1];
    const B = color[2] - targetColor[2];
    const A = color[3] - targetColor[3];

    return (R * R + B * B + G * G + A * A) ** 0.5;
};

function areColorsEqual(color: Color, targetColor: Color, tolerance: number): boolean {
    const colorDistance = getColorDistance(color, targetColor);
    return colorDistance <= tolerance;
};

function getPixelData(imageData: ImageData, x: number, y: number): Color {
    const index = y * (imageData.width * 4) + x * 4;

    return [
        imageData.data[index],
        imageData.data[index + 1],
        imageData.data[index + 2],
        imageData.data[index + 3]
    ]
}

const fillPixel = (imageData: ImageData, targetColor: Color, x: number, y: number) => {
    const index = y * (imageData.width * 4) + x * 4;

    imageData.data[index] = targetColor[0];
    imageData.data[index + 1] = targetColor[1];
    imageData.data[index + 2] = targetColor[2];
    imageData.data[index + 3] = targetColor[3];
}

const TOLERANCE = 150;

export default function floodFill(imageData: ImageData, color: string, newXPosition: number, newYPosition: number): ImageData {
    const targetColor: Color = hexToRGB(color);

    const visited = new Set();
    const stack: { x: number, y: number }[] = [{x: newXPosition, y: newYPosition}];
    const currentColor = getPixelData(imageData, newXPosition, newYPosition);

    while (stack.length > 0) {
        let {x, y} = stack.pop()!;
        const index = y * (imageData.width * 4) + x * 4;

        const pixelColor = getPixelData(imageData, x, y);
        const shouldColorPixel = areColorsEqual(pixelColor, currentColor, TOLERANCE)
        if (
            visited.has(index) || !shouldColorPixel || x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
            continue;
        }

        visited.add(index);
        fillPixel(imageData, targetColor, x, y)


        stack.push({x: x + 1, y});
        stack.push({x: x - 1, y});
        stack.push({x, y: y + 1});
        stack.push({x, y: y - 1});
    }

    console.log(visited.size)

    return imageData;
}