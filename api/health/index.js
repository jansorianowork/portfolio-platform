module.exports = async function (context, req) {
	context.res = {
		status: 200,
		jsonBody: { ok: true },
	};
};
