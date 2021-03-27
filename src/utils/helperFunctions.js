import countries from './countries';

export function countryCodeToCountry(code) {
	for (let i = 0; i<countries.length; i++) {
		if(countries[i].code === code) {
			return countries[i].name;
		}
	}
	return null;
}