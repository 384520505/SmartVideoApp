// 网络请求

function AjaxObj() {
	// get AccessToken
	const getAccessToken = new Promise((resolve, reject) => {
		mui.ajax(TokenUrl, {
			data: {
				appKey,
				appSecret
			},
			type: 'post',
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				const { code, msg, data } = res;
				console.log(msg);
				if (code !== '200') {
					reject(msg);
					return;
				} else {
					resolve(data);
					return;
				}
			},
			error: (xhr, type, errorThrown) => {
				reject(type);
			}
		})
	})
	return {
		getAccessToken
	}
}
