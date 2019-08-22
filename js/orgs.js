export const SoCal = {
	'@type': 'Organization',
	name: 'SoCal Rafting',
	url: 'https://www.socalrafting.com/',
	email: 'booking@socalrafting.com',
	telephone: '+1-888-537-6748',
	sameAs: [
		'http://www.facebook.com/kernriverrafting',
		'https://www.yelp.com/biz/socal-rafting-kernville',
		'http://instagram.com/kernriverrafting',
		'http://www.youtube.com/c/socalrafting',
	],
	logo: {
		'@type': 'ImageObject',
		url: 'https://static.wixstatic.com/media/47074e_e3fd372c95924fc185ce4e614f46669f~mv2_d_2768_1384_s_2.png/v1/crop/x_0,y_264,w_2768,h_863/fill/w_304,h_95,al_c,q_80,usm_0.66_1.00_0.01/47074e_e3fd372c95924fc185ce4e614f46669f~mv2_d_2768_1384_s_2.png',
		height: 95,
		width: 304
	},
	image: {
		'@type': 'ImageObject',
		url: 'https://static.wixstatic.com/media/47074e_fc91557ac96b476aa9487870836a515d~mv2.jpg/v1/fill/w_636,h_477,al_c,q_80,usm_0.66_1.00_0.01/47074e_fc91557ac96b476aa9487870836a515d~mv2.jpg',
		height: 477,
		width: 636
	},
	location: {
		'@type': 'Place',
		name: 'SoCal Rafting',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '11101 Kernville Rd.',
			addressLocality: 'Kernville',
			addressRegion: 'CA',
			addressCountry: 'US',
			postalCode: 93238
		},
		openingHoursSpecification: [{
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: 'Sunday',
			opens: '08:00',
			closes: '20:00',
		}, {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: 'Monday',
			opens: '08:00',
			closes: '18:00',
		}, {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: 'Tuesday',
			opens: '08:00',
			closes: '18:00',
		}, {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: 'Wednesday',
			opens: '08:00',
			closes: '18:00',
		}, {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: 'Thursday',
			opens: '08:00',
			closes: '18:00',
		}, {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: 'Friday',
			opens: '08:00',
			closes: '20:00',
		}, {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: 'Saturday',
			opens: '08:00',
			closes: '20:00',
		}],
	},
};
