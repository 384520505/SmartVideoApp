function Tools (){
	// 获取网络状态
	const getNetStaus = ()=>{
		const netType = plus.networkinfo.getCurrentType();
		if( netType === plus.networkinfo.CONNECTION_NONE){
			mui.toast("无网络连接！",{duration:1500,type:"div"})
		}else if(netType === plus.networkinfo.CONNECTION_CELL2G || netType === plus.networkinfo.CONNECTION_CELL3G){
			mui.toast("当前网络状态较差！",{duration:1500,type:"div"})
		}else{
			mui.toast("网络连接良好！",{duration:1500,type:"div"})
		}
	}
	return {
		getNetStaus
	}
}