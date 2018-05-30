import init from './init'

let dvaApp = null

function dva(app) {
	dvaApp = app
}

const modelNotExisted = m =>
	// eslint-disable-next-line
	!dvaApp._models.some(({ namespace }) => {
		return namespace === m.namespace.substring(m.namespace.lastIndexOf('/') + 1)
	})

function model(...models) {
	return target => {
		models.filter(modelNotExisted).forEach(m => {
			dvaApp.model(m)
		})
		return target
	}
}

export default { dva, model, init }
