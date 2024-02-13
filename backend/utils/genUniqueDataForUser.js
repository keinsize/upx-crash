function genUniqueDataForUser(password = false) {
	const length = password ? 12 : 8
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	var outString = ''

	if (password) chars += '!@#$%^&*()'

	for (let i = 0; i < length; i++) {
		outString += chars[Math.floor(Math.random() * chars.length)]
	}

	return outString
}

module.exports = genUniqueDataForUser
