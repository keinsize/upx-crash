export const formatToCurrency = (number: number) =>
	new Intl.NumberFormat('ru-RU', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})
		.format(number)
		.replace(/,/, '.')
