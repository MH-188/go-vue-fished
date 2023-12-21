/* ========== 下标计算器 ========== */
export const Type_ArabicNumeral='ArabicNumeral'
export const Type_LowerLetter='LowerLetter'
export const Type_CapitalLetter='CapitalLetter'
export const getIndexStr=(type,beginIndex,offset)=>{
    let cal =new IndexCalculator()
    if (Type_ArabicNumeral===type){
        cal=new ArabicNumeral()
    }else if (Type_LowerLetter===type){
        cal=new LowerLetter()
    }else if (Type_CapitalLetter===type){
        cal=new CapitalLetter()
    }
    return cal.getIndexStr(beginIndex,offset)
}



class IndexCalculator {
    constructor(indexType) {
      this.indexType = indexType;
    }
  
    getIndexStr(beginIndex,offset) {
        
        return '';
    }
}


// 阿拉伯数字
class ArabicNumeral extends IndexCalculator {
    getIndexStr(beginIndex,offset) {
        if (beginIndex===''){
            return ''
        }
        let beginNum=parseInt(beginIndex)
        return `${beginNum+offset}`;
    }
}


// 英文小写字母
class LowerLetter extends IndexCalculator {
    getIndexStr(beginIndex,offset) {
        if (beginIndex===''){
            return ''
        }
        if (!/[a-z0]/.test(beginIndex)){
            return '请输入小写字母作为操作数'
        }


        const aCode = 'a'.charCodeAt(0); // 字母a的Unicode码

        
        let beginNum = 0; // 将字母转换为数字，a对应0，b对应1，以此类推
        for (let i=0;i<beginIndex.length;i++){
            if (beginIndex[i]==='0'){
                beginNum+=0
            }else{
                beginNum+=(beginIndex[i].charCodeAt(0) - aCode + 1)*26**(beginIndex.length-i-1)
            }
        }


        console.log('beginNum',beginNum)
        let number=beginNum+offset//从beginNum开始算

        let result=''
        const letters = '0abcdefghijklmnopqrstuvwxyz'; // 26个小写字母
        while (number > 0) {
            let remainder = number % 26; // 求余数
            result = letters[remainder] + result; // 将余数对应的字母添加到结果的前面
            number = Math.floor(number / 26); // 更新被除数
        }
        
        return result;
    }
}


// 英文大写字母
class CapitalLetter extends IndexCalculator {
    getIndexStr(beginIndex,offset) {
        if (beginIndex===''){
            return ''
        }
        if (!/[A-Z0]/.test(beginIndex)){
            return '请输入大写字母作为操作数'
        }


        const aCode = 'A'.charCodeAt(0); // 字母a的Unicode码

        
        let beginNum = 0; // 将字母转换为数字，a对应0，b对应1，以此类推
        for (let i=0;i<beginIndex.length;i++){
            if (beginIndex[i]==='0'){
                beginNum+=0
            }else{
                beginNum+=(beginIndex[i].charCodeAt(0) - aCode + 1)*26**(beginIndex.length-i-1)
            }
        }


        console.log('beginNum',beginNum)
        let number=beginNum+offset//从beginNum开始算

        let result=''
        const letters = '0ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 26个小写字母
        while (number > 0) {
            let remainder = number % 26; // 求余数
            result = letters[remainder] + result; // 将余数对应的字母添加到结果的前面
            number = Math.floor(number / 26); // 更新被除数
        }
        
        return result;
    }
}




