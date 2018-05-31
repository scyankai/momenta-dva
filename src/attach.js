import mva from './mva'

function attach(...models) {
	return target => {
		models.forEach(m => {
			mva.model(m)
		})

		return target
	}
}

export default attach
