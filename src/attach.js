import mva from './mva'

function modelNotExisted(model) {
	/* eslint-disable */
	const app = mva._get_global_dva_app()
	return !app._models().some(({ namespace }) => {
		return namespace === model.namespace.substring(model.namespace.lastIndexOf('/') + 1)
	})
}

function attach(...models) {
	models.filter(modelNotExisted).forEach(m => {
		mva.model(m)
	})
	return target => {
		return target
	}
}

export default attach
