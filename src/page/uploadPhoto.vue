<template>
	<div class="upload">
		<div class="yanzRight">
			<input style="margin-top:5px;float: left;" id="st18" name="evidence" @change="previewImage(this,5)" type="file" />
			<span class="dui" id="imgOrder_dui" style="display: none;"></span>
		</div>
		<div id="preview5" style="margin-left:150px;clear:both; padding-top:15px;">
			<img src="" alt="" id="imghead5" height="200" width="200" style="display:none;" />
		</div>
	</div>
</template>

<script>
	export default({
		name: 'uploadPhoto',
		data() {
			return {

			}
		},
		mounted(){
			this.getData()
		},
		methods: {
			getData() {
				var param="http://" + location.hostname + "/static/image/zhengmian.jpg"
				this.$axios({
					method: "POST",
					url: 'http://test-xservice.zhongan.io/data/ocr/idCard.json?accountNo=15136170590&password=lh910727',
					data:"http://" + location.hostname + "/static/image/zhengmian.jpg"
				}).then((data) => {
					console.log(data)
					
					if(data.data.status=='200')
						console.log(data)
						console.log(1)
					}
				)
			},
			//图片预览功能
			previewImage(file, imgNum) {
				var MAXWIDTH = 500;
				var MAXHEIGHT = 500;
				var div = document.getElementById('preview' + imgNum);
				if(file.files && file.files[0]) {
					div.innerHTML = '<img id=imghead' + imgNum + '>';
					var img = document.getElementById('imghead' + imgNum + '');
					img.onload = function() {
						var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
						img.width = rect.width;
						img.height = rect.height;
						//         img.style.marginLeft = rect.left+'px';
						img.style.marginTop = rect.top + 'px';
					}
					var reader = new FileReader();
					reader.onload = function(evt) { img.src = evt.target.result; }
					reader.readAsDataURL(file.files[0]);
				} else //
				{
					var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
					file.select();
					var src = document.selection.createRange().text;
					div.innerHTML = '<img id=imghead' + imgNum + '>';
					var img = document.getElementById('imghead2');
					img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
					var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
					status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
					div.innerHTML = "<div id=divhead" + imgNum + " style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>"
				}
			},
			clacImgZoomParam(maxWidth, maxHeight, width, height) {
				var param = { top: 0, left: 0, width: width, height: height };
				if(width > maxWidth || height > maxHeight) {
					rateWidth = width / maxWidth;
					rateHeight = height / maxHeight;

					if(rateWidth > rateHeight) {
						param.width = maxWidth;
						param.height = Math.round(height / rateWidth);
					} else {
						param.width = Math.round(width / rateHeight);
						param.height = maxHeight;
					}
				}
				param.left = Math.round((maxWidth - param.width) / 2);
				param.top = Math.round((maxHeight - param.height) / 2);
				return param;
			}
		}
	})
</script>

<style>

</style>