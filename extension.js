// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const treePath = require('./tree');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed




function gettree(dir){
	
	const treeArr = treePath(dir);
	const nums = Math.max(...treeArr.map(el=>el.str.length));
	const tree = treeArr.map(el => el.str + ' '.repeat(nums-el.str.length+2)+'\n').join('');
	return tree;

}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when✔︎ your extension is activated
	console.log('Congratulations, your extension "tree-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.generator', function (uri) {
		// The code you place here will be executed every time your command is executed
		const str = gettree(uri.path);
		vscode.env.clipboard.writeText(str);
		vscode.window.showInformationMessage(`♥︎目录树已经复制到剪贴板上了~`);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
