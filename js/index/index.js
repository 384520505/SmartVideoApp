const App = new Vue({
	el: '#app',
	data() {
		return {
			app: 'smartVideo',
			control: '控制',
			accessToken: '',

		}
	},
	mounted() {
		mui.plusReady(async () => {
			// 强制app横屏显示
			plus.screen.lockOrientation("landscape-primary");
			// 全屏显示，隐藏手机状态栏
			plus.navigator.setFullscreen(true);

			mui.init({});
			
			

			// 初始化侧滑菜单页
			const {
				initSidePage
			} = Tools();
			initSidePage('pages/setting.html', 'setting');

			// 初始化文件
			const {
				isExist,
				writeFile
			} = Tools();
			isExist('_doc/setting.json')
				.then(res => {
					if (res) return;
					if (!res) {
						writeFile(initSettingFile)
							.then(res => {
								console.log('初始化文件成功！');
							})
							.catch(err => {
								console.log('初始化文件失败！');
								console.log(err);
							})
					}
				})


			// 获取网络状态
			const {
				getNetStaus
			} = Tools();
			getNetStaus();

			// 获取视频的token
			// const { getAccessToken }  = AjaxObj();
			// const { accessToken } = await getAccessToken;
			// this.accessToken = accessToken;

			// await this.initVideo();
		})
	},
	methods: {

		// 初始化监控视频
		initVideo() {
			const width = document.documentElement.clientWidth;
			const height = document.documentElement.clientHeight;
			//获取萤石token
			this.player = new EZUIKit.EZUIKitPlayer({
				autoplay: true, // 默认播放
				id: "ezvizvideo",
				accessToken: this.accessToken,
				url: VideoUrl,
				template: "simple",
				width: width,
				height: height,
				handleSuccess: (e) => {}
			});
		},
		setting() {
			let settingPage = plus.webview.getWebviewById('setting')
			settingPage.show();
			let curPage = plus.webview.currentWebview();
			curPage.setStyle({
				mask: "rgba(0,0,0,0.5)",
			})
			curPage.addEventListener('maskClick', function() {
				settingPage.hide();
				curPage.setStyle({
					mask: 'none'
				});
			}, false);
		}
	},

})
