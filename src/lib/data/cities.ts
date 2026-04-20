export type CityTag = "lived" | "studied" | "worked" | "visited" | "layover";

export interface City {
	name: string;
	lat: number;
	lng: number;
	tags: CityTag[];
}

export const cities: City[] = [
	// Northern France
	{ name: "Calais", lat: 50.9513, lng: 1.8587, tags: ["lived", "worked"] },
	{ name: "Lille", lat: 50.6292, lng: 3.0573, tags: ["studied", "worked"] },
	{ name: "Dunkerque", lat: 51.0343, lng: 2.3768, tags: ["studied"] },

	// France
	{ name: "Paris", lat: 48.8566, lng: 2.3522, tags: ["visited"] },
	{ name: "Perpignan", lat: 42.6986, lng: 2.8954, tags: ["visited"] },
	{ name: "Argelès-sur-Mer", lat: 42.5461, lng: 3.0239, tags: ["visited"] },
	{ name: "Biarritz", lat: 43.4832, lng: -1.5586, tags: ["visited"] },
	{ name: "Orléans", lat: 47.9029, lng: 1.9093, tags: ["visited"] },
	{ name: "Mont-Saint-Michel", lat: 48.6361, lng: -1.5115, tags: ["visited"] },

	// Europe
	{ name: "Andorre-la-Vieille", lat: 42.5063, lng: 1.5218, tags: ["visited"] },
	{ name: "La Panne", lat: 51.0986, lng: 2.5908, tags: ["visited"] },
	{ name: "Bruxelles", lat: 50.8503, lng: 4.3517, tags: ["visited"] },
	{ name: "London", lat: 51.5074, lng: -0.1278, tags: ["visited"] },

	// Asia
	{ name: "Pattaya", lat: 12.9236, lng: 100.8825, tags: ["visited"] },
	{ name: "Bangkok", lat: 13.7563, lng: 100.5018, tags: ["visited"] },

	// Layovers
	{ name: "Vienne", lat: 48.2082, lng: 16.3738, tags: ["layover"] },
	{ name: "Doha", lat: 25.2854, lng: 51.5310, tags: ["layover"] },
];
