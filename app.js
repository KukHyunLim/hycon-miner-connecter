
//서버 포트 체크
//프로그램 실행
//1분에 한번씩 서버 ip 체크
//3번이상 연결 끊어지면 프로그램 종료
//서버 연결 되면 다시실행

var spawn = require('child_process').spawn;
const os = require('os');
var miner = null;

var connection = {
	status : false,
	time : Date.now(),
	server_status : false
};

var miner_name = "";

console.log(`
			---------------------------------
			Created by Codev members@codev.kr
			---------------------------------
	`);

if(os.platform() == 'darwin') miner_name = "./xmrig";
if(os.platform() == 'win32') miner_name = "./xmrig.exe";

run();

setInterval(function(){ 
	//console.log(connection.time + "-" + Date.now()+"="+(Date.now()-connection.time) );
	if(Date.now() - connection.time > 180000 && connection.status){
		miner.kill();
		if(connection.server_status && connection.status) console.log("Server connection good but miner status abnormal.");
		if(!connection.server_status) console.log("Server connection problem.");
		connection.status = false;
		connection.time = Date.now();

		setTimeout(function() { 
			run();
			console.log(`
				-------------
				Restart Miner
				-------------
				`);
		}, 2000);
		
	}
}, 10000);

function run(){
	miner = spawn(miner_name);
	connection.status = true;

	miner.stdout.on('data', function (data) {
		console.log(data.toString());
	  	//console.log('stdout: ' + data.toString().includes("new job"));

	  	if(data.toString().includes("new job")){
	  		connection.time = Date.now();
	  		connection.server_status = true;
	  	}
	  	if(data.toString().includes("connection refused")){
	  		connection.server_status = false;
	  	}
	});

	miner.stderr.on('data', function (data) {
		console.log('stderr: ' + data.toString());
	});

	miner.on('exit', function (code) {
		console.log('child process exited with code ' + code.toString());
	});
}