exports.roleRestriction = (...roles) => {
	console.log(roles)
	return (req, res, next) => {
		if (!roles.includes(req.auth.role)) {
			throw new Error(
				"You do not have permission to perform this action. Contact Admin"
			)
		}
		next()
	}
}
