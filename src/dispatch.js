import mva from './mva'

const app = mva._get_global_dva_app()

export default action => {
	app._store.dispatch(action)
}
