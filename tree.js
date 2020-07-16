const fs = require("fs");
const path = require("path");
const ignore = ['node_modules'];

const treePath = function(dir) {
    const treeArr = [{
        name: path.basename(dir),
        str: path.basename(dir)
    }];
    
    const render = function(name,isLast,deep){
        const line = deep.map(el=>`${el?'│':' '}  `).join('');
        const text = `${line}${isLast?'└─':'├─'} ${name}`;
        return {
            name: name,
            str: text
        }; 
    }

    const tree = function(target,deep=[]){
        const child = fs.readdirSync(target).filter(el=>!el.startsWith('.'));
        const direct = [];
        const file = [];
        child.forEach(function(el){
            const dir = path.join(target,el);
            const stat = fs.statSync(dir);
            const flag = ignore.every(function(reg){
                return !dir.includes(reg);
            })
            if(flag){
                if(stat.isFile()){ 
                    file.push(el);
                }else{
                    direct.push(el);
                }
            }
            
        })
        direct.forEach(function(el,i){
            const dir = path.join(target,el);
            const isLast = (i === direct.length -1) && (file.length === 0);
            treeArr.push(render(el,isLast,deep));
            tree(dir,[...deep,!isLast]);
        })
        file.forEach(function(el,i){
            const isLast = i === file.length -1;
            treeArr.push(render(el,isLast,deep));
        })
    }
    
    tree(dir);
    return treeArr;
}


module.exports = treePath;