import Cinput from './Cinput.vue';
import HqFileUpload from './fileUpload.vue';
 
let GComponent={
	install:function(Vue){
		Vue.component('Cinput',Cinput)
		Vue.component('HqFileUpload',HqFileUpload)
	}
}
export default GComponent