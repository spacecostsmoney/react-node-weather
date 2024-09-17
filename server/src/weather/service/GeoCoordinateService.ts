type GeoLocationResult = {
    result: {
        addressMatches: Array<{
            coordinates: {
                x: number,
                y: number
            }
        }>
    }
};

export type Coordinate = {
    x: number;
    y: number
};

export const getCoordinatesFromAddress = async (street: string, zipcode: string): Promise<Coordinate> => {
    const response = await fetch(`https://geocoding.geo.census.gov/geocoder/locations/address?street=${street}&zip=${zipcode}&benchmark=Public_AR_Current&format=json`)

    if (!response.ok) {
        console.error('error happened');
        throw new Error('Could not find coordinates');
    }

    const data: GeoLocationResult = await response.json();

    if (data.result.addressMatches.length === 0) {
        throw new Error('No matching coordinates found');
    }

    return data.result.addressMatches[0].coordinates;
}
